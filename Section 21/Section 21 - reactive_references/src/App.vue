<template>
  <div>
    <p>{{ num }}</p>
    <p>{{ double }}</p>
    <button @click.prevent="increment">Click Me</button>

    <p>{{ name }}</p>

    <input type="text" v-model="phrase" />
    <p>{{ reversedPhrase }}</p>

    <AppAlert :user="user" ref="alert" />

    <button type="button" ref="btn">Button</button>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
} from "vue";
import AppAlert from "@/components/Alert.vue";
import { useNumber } from "./hooks/number";
import { usePhrase } from "./hooks/phrase";

export default {
  name: "App",
  components: {
    AppAlert,
  },
  setup() {
    const btn = ref(null);
    const alert = ref(null);

    onBeforeMount(() => {
      console.log("onBeforeMount()");
    });

    onMounted(() => {
      console.log("onMounted()");

      btn.value.addEventListener("click", () => {
        console.log("button clicked");
      });

      alert.value.shout();
    });

    const user = reactive({
      name: "DMB",
      age: 23,
    });

    setTimeout(() => {
      user.name = "Dumebi";
    }, 3000);

    const { num, increment, double } = useNumber();

    const { phrase, reversedPhrase, num: phraseNum } = usePhrase();

    return {
      num,
      increment,
      ...toRefs(user),
      phrase,
      reversedPhrase,
      double,
      user,
      btn,
      alert,
      phraseNum
    };
  },
};
</script>
