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
  watch,
  computed,
  onBeforeMount,
  onMounted,
} from "vue";
import AppAlert from "@/components/Alert.vue";

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

      alert.value.shout()
    });
    let num = ref(0);

    function increment() {
      num.value++;
    }

    const double = computed(() => num.value * 2);

    const user = reactive({
      name: "DMB",
      age: 23,
    });

    setTimeout(() => {
      user.name = "Dumebi";
    }, 3000);

    const phrase = ref("");
    const reversedPhrase = ref("");

    // watch([phrase, num], ([newVal], [oldVal]) => {
    //   console.log({ newVal, oldVal });
    //   reversedPhrase.value = phrase.value.split("").reverse().join("");
    // });

    watch(() => {
      reversedPhrase.value = phrase.value.split("").reverse().join("");
    });

    return {
      num,
      increment,
      ...toRefs(user),
      phrase,
      reversedPhrase,
      double,
      user,
      btn,
      alert
    };
  },
};
</script>
