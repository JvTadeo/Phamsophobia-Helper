import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ToolBoxView from "@/views/ToolBoxView.vue";
import StopwatchView from "@/views/StopwatchView.vue";
import MediaView from "@/views/MediaRewardsView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,

    },
    {
        path: "/toolbox",
        name: "toolbox",
        component: ToolBoxView,
    },
    {
        path: "/media",
        name: "media",
        component: MediaView,
    },
    {
        path: "/stopwatch",
        name: "stopwatch",
        component: StopwatchView,
        meta: {
            standalone: true
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;