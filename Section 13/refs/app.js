const app = Vue.createApp({
  data: () => ({
    title: "Hello",
  }),
}).mount("#app");

setTimeout(() => {
  app.$refs.greeting.innerText = "Another Hello";
}, 3000);
