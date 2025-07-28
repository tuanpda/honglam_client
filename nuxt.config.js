import companyConfig from "./config.company";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: "universal",
  head: {
    title: "Hệ thống hỗ trợ TCDV Thu",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo-asxh.png" },
      {
        rel: "stylesheet",
        href: "/fontawesome-free-6.5.1-web/css/all.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
        integrity:
          "sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/bulma/css/bulma.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/sweetalert2", ssr: false },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/filters", ssr: false },
     { src: "~/plugins/vue-select", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: "/",
    baseURL: companyConfig.apiBaseURL,
    // baseURL: "http://localhost:4209",
    credentials: true,
  },

  server: {
    port: companyConfig.port_client,
    host: companyConfig.host,
    // host: "localhost",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    // Thêm route catch-all
    extendRoutes(routes, resolve) {
      routes.push({
        name: "catch-all",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"), // Đường dẫn đến trang "This page could not be found"
      });
    },
  },
};
