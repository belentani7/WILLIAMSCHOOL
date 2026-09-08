import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history, language = 'es' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: "Mensaje requerido" });
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
app.post("/api/gemini/generate-lesson", async (req, res) => {
  try {
    const { subject, topic } = req.body;
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
