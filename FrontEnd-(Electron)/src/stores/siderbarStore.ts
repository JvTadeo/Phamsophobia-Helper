import { defineStore } from "pinia";
import type { ISideBarItem } from "@/interface/ISideBarItem";
import { Timer } from "lucide-vue-next";

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({
        items: [
            {
                name: "Stopwatch",
                icon: Timer,
                action: () => {}
            },
        ] as ISideBarItem[],
    }),
    actions: {
        
    },
});