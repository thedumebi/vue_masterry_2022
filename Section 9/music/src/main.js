import { createApp } from "vue";

import "./assets/main.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/tailwind.css";
import VeeValidatePlugin from "./includes/validation";

let app = createApp(App);

app.use(store);
app.use(router);
app.use(VeeValidatePlugin);

app.mount("#app");
