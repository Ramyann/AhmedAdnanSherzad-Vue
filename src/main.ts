import "./style.css";
import App from "./App.vue";

import router from "@/router";
import { createApp } from "vue";
import { createPinia } from "pinia";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createPinia());
app.mount("#app");
