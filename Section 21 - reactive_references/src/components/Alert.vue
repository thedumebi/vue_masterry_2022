<template>
  <div v-if="!flag" style="color: red">Name Changed!</div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["user"],
  setup(props, context) {
    context.emit("eventName", {});

    const flag = computed(() => {
      return props.user.name === "DMB";
    });

    const shout = () => {
      console.log("Shouting!!!");
    };

    return { flag, shout };
  },
};
</script>

<style>
</style>