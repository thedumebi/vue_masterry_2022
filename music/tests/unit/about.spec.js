import About from "@/views/About.vue";
import { mount } from "@vue/test-utils";

// allow us group tests together
describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = mount(About);
  });
});
