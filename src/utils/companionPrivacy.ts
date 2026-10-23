/** Privacy boundary for the student-facing companion. No network call is permitted without an explicit, session-only opt-in. */
export type CompanionPrivacyLanguage = 'pt' | 'es' | 'ca' | 'en';
export type CompanionPrivacyHistoryEntry = { sender: 'user' | 'companion'; text: string };

export const LOCAL_PRIVACY_REPLY: Record<CompanionPrivacyLanguage, string> = {
  pt: 'Modo local: sua mensagem ficou neste navegador. Para respostas de IA, ative a opção de envio ao servidor. Não compartilhe dados pessoais.',
  es: 'Modo local: tu mensaje se quedó en este navegador. Para respuestas de IA, activa el envío al servidor. No compartas datos personales.',
  ca: 'Mode local: el missatge s’ha quedat en aquest navegador. Per obtenir respostes d’IA, activa l’enviament al servidor. No comparteixis dades personals.',
  en: 'Local mode: your message stayed in this browser. For AI responses, enable sending to the server. Do not share personal information.',
};

export const REMOTE_PRIVACY_LABEL: Record<CompanionPrivacyLanguage, string> = {
  pt: 'Permitir envio ao servidor e ao provedor de IA configurado (até 8 mensagens anteriores). Desativado por padrão; não informe dados pessoais.',
  es: 'Permitir envío al servidor y al proveedor de IA configurado (hasta 8 mensajes anteriores). Desactivado por defecto; no introduzcas datos personales.',
  ca: 'Permet enviar al servidor i al proveïdor d’IA configurat (fins a 8 missatges anteriors). Desactivat per defecte; no hi posis dades personals.',
  en: 'Allow sending to the server and configured AI provider (up to 8 previous messages). Off by default; do not enter personal information.',
};

/** Returns null, rather than a request payload, unless the student explicitly opts in. */
export function prepareRemoteCompanionRequest(
  allowRemote: boolean,
  message: string,
  language: CompanionPrivacyLanguage,
  context: string,
  history: readonly CompanionPrivacyHistoryEntry[],
) {
  if (allowRemote !== true) return null;
  const normalized = message.trim();
  if (!normalized || normalized.length > 2000) return null;
  return {
    message: normalized,
    language,
    context,
    // The new message is sent once, separately. Never duplicate it in history.
    history: history.slice(-8).map(({ sender, text }) => ({ sender, text: text.slice(0, 2000) })),
  };
}
