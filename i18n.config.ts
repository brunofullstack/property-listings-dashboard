import en from "./locales/en-US.json";
import pt from "./locales/pt-BR.json";
import de from "./locales/de-DE.json";
import ar from "./locales/ar-AR.json";

export default defineI18nConfig(() => ({
  legacy: false,
  langDir: "./locales",
  messages: { "en-US": en, "pt-BR": pt, "de-DE": de, "ar-AR": ar },
  baseUrl: import.meta.env.VITE_BASE_URL,
  locales: [
    {
      code: "en",
      iso: "en-US",
      isCatchallLocale: true,
    },
    {
      code: "pt",
      iso: "pt-BR",
    },
    {
      code: "de",
      iso: "de-DE",
    },
    {
      code: "ar",
      iso: "ar-AR",
    },
  ],
}));
