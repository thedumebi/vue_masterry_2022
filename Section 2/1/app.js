const vm = Vue.createApp({
  data() {
    return {
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      url: "https://google.com",
      raw_url: "<a href='https://google.com' target='_blank'>Google</a>",
      age: 20,
    };
  },
  methods: {
    increment() {
      this.age++;
    },
    updateLastName(msg, event) {
      console.log(msg);

      this.lastName = event.target.value;
    },
    updateMiddleName(e) {
      this.middleName = e.target.value;
    },
  },
  computed: {
    fullName() {
      console.log("full name computed property was called!");

      return `${this.firstName} ${
        this.middleName
      } ${this.lastName.toUpperCase()}`;
    },
  },
  watch: {
      age(newVal, oldVal) {
          setTimeout(() => {
              this.age = 20
          }, 3000)
      }
  }
}).mount("#app");

// setTimeout(() => {
//     vm.firstName = "Bob"
// }, 2000)

// Vue.createApp({
//   data() {
//     return {
//       firstName: "Jane",
//       lastName: "Doe"
//     };
//   },
// }).mount("#app2");
