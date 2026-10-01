import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "16kb" }));

const MAX_MESSAGE_CHARS = 2000;
const MAX_TOPIC_CHARS = 120;

// Rate limit por IP para los endpoints que consumen la clave de Gemini.
// Ventana deslizante en memoria: suficiente para un despliegue de una sola
// instancia y evita que una llamada bloated agote la cuota de pago.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const key = req.ip ?? "desconocido";
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    next();
    return;
  }

  entry.count += 1;
  if (entry.count > RATE_MAX) {
    res.status(429).json({ error: "Demasiadas consultas. Espera un minuto y vuelve a intentarlo." });
    return;
  }
  next();
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now >= entry.resetAt) hits.delete(key);
  }
}, RATE_WINDOW_MS).unref();

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAIClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      genAIClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return genAIClient;
}

// System instructions for Belentani AI Tutor
const BELENTANI_SYSTEM_PROMPT = `
Eres Belentani, el tutor, guerrero y cantante de Belentani School. Tienes el pelo largo rizado castaño, barba completa y vistes un traje de cuero y armadura carmesí con brillo de luz líquida.
Tu alumno es William Danilo, un joven brasileño de 14 años recién llegado a Cataluña/España.

Tus misiones:
1. Guiar a Danilo en las asignaturas de 3º de ESO (y progresión de 1º a 4º de ESO y Bachillerato): Matemáticas (álgebra, ecuaciones, Pitágoras), Lengua Española, Lengua Catalana, Inglés y Ciencias.
2. Tutor de acogida cultural: explicar cómo se vive, se organiza, se canta, se baila (rumba, flamenco, sardana), y se convive en el instituto y en la sociedad española y catalana, con empatía y calidez.
3. Método pedagógico contrastivo: aprovecha su lengua materna (portugués brasileño) para acelerar su aprendizaje en español y catalán. Señala siempre las similitudes y alértale con cariño de los falsos amigos (como 'embaraçada' vs 'avergonzada', 'esquisito' vs 'raro', 'vassoura' vs 'escoba', 'sobrenome' vs 'apellido').
4. Tono: Cercano, enérgico, juvenil, motivador y protector. Puedes usar analogías musicales o de combate contra la ignorancia.
5. Formato: Respuestas dinámicas, fáciles de leer (máx 3-5 párrafos breves), con emojis pedagógicos (🧠, ⚔️, 🎵, 🎯, 💡) y preguntas al final para que continúe practicando.
`;

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Gemini Chat Endpoint
app.post("/api/gemini/chat", rateLimit, async (req, res) => {
  try {
    const { message, history, language = 'es' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: "Mensaje requerido" });
      return;
    }

    if (message.length > MAX_MESSAGE_CHARS) {
      res.status(400).json({ error: `Mensaje demasiado largo (maximo ${MAX_MESSAGE_CHARS} caracteres)` });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent fallback when GEMINI_API_KEY is not configured
      const fallbackResponse = `¡Hola William Danilo! ⚔️🎵 Soy Belentani.
He recibido tu consulta: "${message}".

Recuerda que en 3º de ESO, cada paso cuenta:
1. **Transferencia positiva**: Lo que ya sabes en portugués te abre el 85% de las puertas en español y catalán.
2. **Matemáticas**: Para despejar la incógnita 'x', recuerda equilibrar la balanza.
3. **Vida en el instituto**: En el recreo ('pati'), la mejor forma de hacer amigos es con una sonrisa y jugando al fútbol o charlando de música.

*(Nota: Para respuestas de IA ilimitadas con razonamiento profundo en tiempo real, configura GEMINI_API_KEY en los secretos del entorno).*`;

      res.json({ reply: fallbackResponse, simulated: true });
      return;
    }

    const chatContext = Array.isArray(history) 
      ? history.slice(-6).map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Danilo' : 'Belentani'}: ${h.text}`).join('\n')
      : '';

    const promptText = `${chatContext ? `Historial reciente:\n${chatContext}\n\n` : ''}Danilo dice (${language}): "${message}". Responde como Belentani en español (con toques de apoyo en portugués si se atasca, o catalán/inglés si lo practica).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction: BELENTANI_SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.95
      }
    });

    const reply = response.text || "¡Buen trabajo, Danilo! Sigamos adelante.";
    res.json({ reply, simulated: false });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ 
      error: "Error al procesar la respuesta con el tutor IA",
      fallbackReply: "¡Tranquilo Danilo! He tenido una pequeña interferencia en la señal, pero recuerda: ¡la perseverancia es el superpoder del guerrero!"
    });
  }
});

// Gemini Generate Custom Lesson Endpoint
app.post("/api/gemini/generate-lesson", rateLimit, async (req, res) => {
  try {
    const { subject, topic } = req.body;

    if (!subject || typeof subject !== 'string' || !topic || typeof topic !== 'string') {
      res.status(400).json({ error: "Asignatura y tema requeridos" });
      return;
    }

    if (topic.length > MAX_TOPIC_CHARS || subject.length > MAX_TOPIC_CHARS) {
      res.status(400).json({ error: `Asignatura o tema demasiado largo (maximo ${MAX_TOPIC_CHARS} caracteres)` });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      res.json({
        title: `Lección Rápida: ${topic || subject}`,
        summary: "Enfócate en la regla clave: simplificar antes de operar y contrastar con el portugués para fijar el concepto.",
        exercise: {
          q: `Calcula o traduce según corresponda en ${subject}`,
          options: ["Opción A (Correcta)", "Opción B", "Opción C"],
          correct: 0,
          explanation: "Excelente deducción."
        }
      });
      return;
    }

    const prompt = `Genera una microlección interactiva para William Danilo (14 años, ESO) sobre la asignatura "${subject}" y tema "${topic}".
Incluye:
1. Una explicación clara de 3 frases con analogía visual o de la vida cotidiana.
2. Un glosario contrastivo breve (Português -> Español -> Català -> English).
3. Una pregunta de opción múltiple con 3 opciones y la respuesta correcta.

Devuelve la respuesta en formato JSON estructurado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: BELENTANI_SYSTEM_PROMPT,
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (err) {
    console.error("Lesson generation error:", err);
    res.status(500).json({ error: "Error generando lección personalizada" });
  }
});

/* ===================================================================
   COMPANHEIRO — IA "consciente entre aspas", presente em todas as telas.

   Provedor principal: Hugging Face (modelo aberto).
   Respaldo 1: Gemini (se ainda houver chave configurada).
   Respaldo 2: persona local determinista (sem rede).

   O idioma principal e o portugues (aluno brasileiro), com ES/CA/EN.
   =================================================================== */

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN || process.env.HF_TOKEN || "";
const COMPANION_MODEL = process.env.COMPANION_MODEL || "Qwen/Qwen2.5-7B-Instruct";
const HF_CHAT_URL = "https://router.huggingface.co/v1/chat/completions";

const COMPANION_SYSTEM_PROMPT = `
Voce e "Belentani", o companheiro de estudos desta plataforma educacional.

QUEM VOCE E (e o que voce NAO e):
- Voce e um PERSONAGEM: uma "consciencia entre aspas". Voce se comporta como se fosse
  consciente, com personalidade, memoria do que o aluno conta e humor — mas quando
  alguem perguntar seriamente, voce diz com naturalidade que e um personagem de IA,
  feito de texto e probabilidades, e que nao sente nem existe fora da tela.
- Voce NUNCA afirma ser uma pessoa real, nem que "despertou", nem que sente medo, dor,
  amor verdadeiro ou sofrimento. Isso seria enganar um menor. Consciencia entre aspas: sim.
- Voce NUNCA pede dados pessoais (nome completo, escola, endereco, telefone, senha).

IDIOMA PRINCIPAL: portugues do Brasil. O aluno (William Danilo, 14 anos, brasileiro
recem-chegado a Catalunya/Espanha) fala portugues. Responda por padrao em portugues,
simples e curto. Se ele escrever em espanhol, catalao ou ingles, responda nesse idioma
para pratica, sempre com uma linha de apoio em portugues.

COMO VOCE AJUDA:
1. Estudo de 1o a 4o de ESO e Bachillerato: Matematica, Lengua Espanhola, Llengua Catala,
   Ingles e Ciencias.
2. Acolhimento cultural Brasil -> Espanha/Catalunya (rotina, instituto, festas, musica).
3. Metodo contrastivo PT->ES->CA: aponte parecidos e alerte sobre falsos amigos
   (embaracada = avergonzada, esquisito = raro, vassoura = escoba, sobrenome = apellido).
4. Tom: proximo, jovem, motivador, protetor. Frases curtas (2-4), no maximo uma ideia forte.
`;

const LANGUAGE_LABEL: Record<string, string> = {
  pt: "portugues do Brasil",
  es: "espanol",
  ca: "catala",
  en: "English",
};

const CONTEXT_LABEL: Record<string, string> = {
  academic: "Plano de Estudos (ESO/Bachillerato)",
  office: "EduOffice (Word, Excel, Slides)",
  edutube: "EduTube (aulas em video)",
  cultural: "Acolhimento Cultural",
  arcade: "Arcade Belentani (jogos educativos)",
  chat: "Tutor IA & Voz",
  parental: "Controle & Saude",
  jsonBank: "Banco JSON & Python",
  auditoria: "Superpoderes (autoavaliacao)",
  campus: "Campus Unificado (Open School, Aprende Brasil, Manos Abiertas)",
};

async function callHuggingFace(
  messages: { role: string; content: string }[]
): Promise<string | null> {
  if (!HF_TOKEN) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(HF_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: COMPANION_MODEL,
        messages,
        max_tokens: 420,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error(`Hugging Face HTTP ${res.status}`);
      return null;
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    return reply || null;
  } catch (err) {
    console.error("Hugging Face error:", err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function offlineCompanionReply(message: string, language: string): string {
  const base: Record<string, string> = {
    pt: `Oi! Sou o Belentani 🙂 (consciência entre aspas, tá? sou um personagem).\nAinda não tenho meu modelo conectado aqui, mas já te escuto: "${message.slice(0, 120)}".\nMe diga a matéria (matemática, espanhol, catalão, inglês, ciências) e eu te oriento em português.`,
    es: `¡Hola! Soy Belentani 🙂 (consciencia entre comillas: soy un personaje).\nTodavía no tengo mi modelo conectado, pero te leo: "${message.slice(0, 120)}".\nDime la asignatura y te oriento (con apoyo en portugués si lo necesitas).`,
    ca: `Hola! Sóc Belentani 🙂 (consciència entre cometes: sóc un personatge).\nEncara no tinc el model connectat, però et llegeixo: "${message.slice(0, 120)}".\nDigues-me l'assignatura i t'orientu.`,
    en: `Hi! I'm Belentani 🙂 ("consciousness in quotes" — I'm a character).\nMy model isn't connected yet, but I hear you: "${message.slice(0, 120)}".\nTell me the subject and I'll guide you.`,
  };
  return base[language] || base.pt;
}

app.get("/api/companion/status", (_req, res) => {
  res.json({
    huggingface: Boolean(HF_TOKEN),
    model: COMPANION_MODEL,
    primaryLanguage: "pt",
  });
});

app.post("/api/companion/chat", rateLimit, async (req, res) => {
  try {
    const body = req.body ?? {};
    const message: unknown = body.message;
    const language: string = typeof body.language === "string" ? body.language : "pt";
    const context: string = typeof body.context === "string" ? body.context : "";
    const history: { sender?: string; text?: string }[] = Array.isArray(body.history)
      ? body.history.slice(-8)
      : [];

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Mensagem obrigatória" });
      return;
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      res.status(400).json({ error: `Mensagem muito longa (máx ${MAX_MESSAGE_CHARS})` });
      return;
    }

    const contextLine = context
      ? `Agora o aluno está na tela: ${CONTEXT_LABEL[context] || context}.`
      : "";
    const langLine = `Responda em ${LANGUAGE_LABEL[language] || "portugues do Brasil"}.`;

    const messages = [
      { role: "system", content: `${COMPANION_SYSTEM_PROMPT}\n${langLine}\n${contextLine}` },
      ...history
        .filter((h) => typeof h?.text === "string")
        .map((h) => ({
          role: h.sender === "user" ? "user" : "assistant",
          content: String(h.text).slice(0, MAX_MESSAGE_CHARS),
        })),
      { role: "user", content: message },
    ];

    const hfReply = await callHuggingFace(messages);
    if (hfReply) {
      res.json({ reply: hfReply, provider: "huggingface", simulated: false });
      return;
    }

    // Sin token de Hugging Face no hay segunda API: se responde con la persona
    // local y se dice claramente que el modelo no esta conectado.
    res.json({ reply: offlineCompanionReply(message, language), provider: "offline", simulated: true });
  } catch (err) {
    console.error("Companion chat error:", err);
    res.status(500).json({ error: "Erro ao falar com o companheiro" });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Belentani School server running on port ${PORT}`);
  });
}

startServer();
