import { createStore } from "vuex";
import { cloneDeep } from "lodash";
import auth from "@/store/modules/auth";
import player from "@/store/modules/player";

jest.mock("@/includes/firebase", () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe("Vuex Store", () => {
  test("toggleAuth mutates sets userLoggedIn to true", () => {
    const clonedAuth = cloneDeep(auth);

    const store = createStore({
      modules: { auth: clonedAuth },
    });

    expect(store.state.auth.userLoggedIn).not.toBe(true);
    store.commit("toggleAuth");
    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  test("login action sets userLoggedIn to true", async () => {
    expect.assertions(2);

    const clonedAuth = cloneDeep(auth);

    const store = createStore({
      modules: { auth: clonedAuth },
    });

    expect(store.state.auth.userLoggedIn).toBe(false);
    await store.dispatch("login", { email: "", password: "" });
    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  it("playing returns true if audio is playing", () => {
    const state = {
      sound: {
        playing: () => true,
      },
    };

    const result = player.getters.playing(state);
    expect(result).toEqual(true);
  });
});
