import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const Home = () => import("../views/Home.vue");
const Manage = () => import(/* webpackChunkName: "groupedChunk" */ "../views/Manage.vue");
const Song = () => import(/* webpackChunkName: "groupedChunk" */ "../views/Song.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/manage-music",
    name: "manage",
    // alias: "/manage",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log("Manage Route Guard");
      next();
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  // console.log(to.matched);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
