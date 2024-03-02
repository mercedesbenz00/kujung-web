// https://nuxt.com/docs/api/configuration/nuxt-config
import ko from "./locales/ko.json";

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" },
        {
          name: "title",
          content: "구정마루",
        },
        {
          name: "description",
          content: "30여년간 마루만 연구해온 친환경 바닥재 전문기업. 250여가지의 강마루, 온돌마루, 원목마루 자체 생산",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        },
      ],
      script: [
        // { src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' },
        {
          src: "https://code.jquery.com/jquery-1.12.4.min.js",
          type: "text/javascript",
        },
        {
          src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
          type: "text/javascript",
        },
        {
          src: "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js",
          type: "text/javascript",
        },
        {
          src: "https://developers.kakao.com/sdk/js/kakao.min.js",
          type: "text/javascript",
        },
        {
          src: "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js",
          type: "text/javascript",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in", // default
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/fonts/line-awesome-1.3.0/css/line-awesome.css",
    "~/assets/css/index.scss",
    "vue-final-modal/style.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    'primevue/resources/themes/lara-dark-teal/theme.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: "~/ts/aos", mode: "client" }, { src: '~/plugins/vue-toast-notification.js', mode: 'client' }],
  components: true,
  modules: [
    "@nuxt/image-edge",
    "@nuxtjs/i18n",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@fullpage/nuxt-fullpage",
    // 'vue-daum-postcode/nuxt',
    'nuxt-primevue'
  ],
  primevue: {

  },
  i18n: {
    vueI18n: {
      legacy: false,
      fallbackLocale: "ko",
      locale: "ko",
      messages: { ko },
    },
  },
});
