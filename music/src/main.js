import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import Icon from "./directives/icon";

import "./assets/tailwind.css";
import "./assets/main.css";
import "./registerServiceWorker";

import i18n from "./includes/i18n";
import { auth } from "./includes/firebase";
import GlobalComponents from "./includes/_globals";
import VeeValidatePlugin from "./includes/validation";
import ProgressBar from "./includes/progress-bar";
import "nprogress/nprogress.css";

ProgressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(GlobalComponents);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
