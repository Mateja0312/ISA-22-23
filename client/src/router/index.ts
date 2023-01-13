import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomeJuncture.vue"),
  },
  {
    path: "*",
    component: () => import("../views/Page404.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/centers",
    name: "Centers",
    component: () => import("../views/Centers.vue"),
  },
  {
    path: "/center/:id",
    name: "Center",
    component: () => import("../views/Center.vue"),
    props: true,
  },
  {
    path: "/feedback-response/:id",
    name: "FeedbackRespond",
    component: () => import("../views/FeedbackRespond.vue"),
    props: true,
  },
  {
    path: "/questionnaire",
    name: "Questionnaire",
    component: () => import("../views/Questionnaire.vue"),
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/Feedback.vue"),
  },
  {
    path: "/feedback-response",
    name: "FeedbackResponseList",
    component: () => import("../views/FeedbackResponseList.vue"),
  },
  {
    path: "/feedback-history",
    name: "FeedbackHistory",
    component: () => import("../views/FeedbackHistory.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
