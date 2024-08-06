import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/dashboard.vue"),
      },
      {
        path: "/drivers",
        component: () => import("../pages/drivers.vue/driversList.vue"),
      },
      {
        path: "/quiz",
        component: () => import("../pages/quiz/quiz.vue"),
      },
      {
        path: "/quizes/:id",
        component: () => import("../pages/quizList.vue"),
      },
      {
        path: "/edit-quiz/:id",
        component: () => import("../pages/editQuiz.vue"),
      },
      {
        path: "/create-quiz/:id",
        component: () => import("../pages/createQuiz.vue"),
      },
      {
        path: "/users",
        component: () => import("../pages/users/userList.vue"),
      },
      {
        path: "/category/:id",
        component: () => import("../pages/subcategories.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = true;
  if (to.name !== "login" && !token) next({ name: "login" });
  else next();
});

export default router;
