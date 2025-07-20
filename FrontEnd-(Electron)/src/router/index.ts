import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StopwatchView from "@/views/StopwatchView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,

    },
    {
        path: "/stopwatch",
        name: "stopwatch",
        component: StopwatchView,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;