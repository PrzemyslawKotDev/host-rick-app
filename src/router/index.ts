import { createRouter, createWebHistory } from "vue-router";
import BasicView from "../views/BasicView.vue";
import FavoritesView from "../views/FavoritesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "basic",
      component: BasicView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView
    }
  ]
});

export default router;
