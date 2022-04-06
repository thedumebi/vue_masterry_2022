import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import VeeValidatePlugin from "./includes/validation";

import "./assets/tailwind.css";
import "./assets/main.css";
import i18n from "./includes/i18n";
import './registerServiceWorker'

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
