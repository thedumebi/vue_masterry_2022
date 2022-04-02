import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import { auth } from "./includes/firebase";
import VeeValidatePlugin from "./includes/validation";

import "./assets/main.css";
import "./assets/tailwind.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount("#app");
  }
});
