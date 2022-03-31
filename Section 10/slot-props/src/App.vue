<template>
  <div id="app">
    <!-- <hello-world v-slot="v">
      <p>Hello {{v.user.name}}</p>
    </hello-world> -->
    <hello-world #default="{user, favorites}">
      <p>Hello {{ user.name }}. I like {{favorites[0]}}.</p>

      <p v-for="favorite in favorites" :key="favorite">{{favorite}}</p>
    </hello-world>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>
