import About from "@/views/About.vue";
import { shallowMount } from "@vue/test-utils";

// allow us group tests together
describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain("about");
  });
});
