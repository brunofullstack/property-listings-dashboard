// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import en from "./locales/en-US.json";
import pt from "./locales/pt-BR.json";
import de from "./locales/de-DE.json";
import ar from "./locales/ar-AR.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: true,
    logLevel: 4,
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/device",
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@dargmuesli/nuxt-cookie-control",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    viewer: true,
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    dirs: ["./stores", "./locales"],
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  colorMode: {
    classSuffix: "light",
  },
  image: {
    provider: "ipx",
    quality: 80,
    format: ["png", "jpeg", "webp"],
  },
  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: true,
      fallbackLocale: "en-US",
      redirectOn: "root", // recommended
    },
  },
  eslint: {
    lintOnStart: false,
  },
  cookieControl: {
    cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365, // one year
    // set all these to true for highest GDPR enforcement
    isAcceptNecessaryButtonEnabled: true,
    isModalForced: false,
    isCookieIdVisible: true,
    closeModalOnClickOutside: true,
    // show cookie button
    isControlButtonEnabled: true,
    // disable to get unstyled css for tailwind
    isCssEnabled: false,
    isDashInDescriptionEnabled: false,
    cookies: {
      necessary: [
        {
          name: {
            de: de.cookies.necessary.title,
            en: en.cookies.necessary.title,
            pt: pt.cookies.necessary.title,
            ar: ar.cookies.necessary.title,
          },
          description: {
            de: de.cookies.necessary.description,
            en: en.cookies.necessary.description,
            pt: pt.cookies.necessary.description,
            ar: ar.cookies.necessary.description,
          },
          targetCookieIds: ["ncc_"],
          id: "",
        },
      ],
      optional: [],
    },
    locales: ["en", "pt", "de", "ar"],
  },
});
