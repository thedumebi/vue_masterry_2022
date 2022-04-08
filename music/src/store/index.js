import { createStore } from "vuex";
import i18n from "@/includes/i18n";
import modules from "./modules";
// import auth from "./modules/auth";
// import player from "./modules/player";

// const moduleFiles = require.context("./modules", true, /\.js$/);
// const modules = moduleFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   modules[moduleName] = moduleFiles(modulePath).default;

//   return modules;
// }, {});

export default createStore({
  // modules: {
  //   auth,
  //   player,
  // },
  modules,
  state: {
    locale: i18n.global.locale,
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
  },
  mutations: {
    changeLocale(state, payload) {
      state.locale = payload;
    },
  },
  actions: {
    changeLocale({ commit }, payload) {
      commit("changeLocale", payload);
      i18n.global.locale = payload;
    },
  },
  // modules: {
  // },
});
