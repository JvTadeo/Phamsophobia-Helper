import { defineStore } from "pinia";
import type { ISideBarItem } from "@/interface/ISideBarItem";
import { Timer } from "lucide-vue-next";

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({
        items: [
            {
                name: "Stopwatch",
                icon: Timer,
                action: () => {
                    if (window.electronAPI?.stopwatch?.show) {
                        window.electronAPI.stopwatch.show();
                    }
                }
            },
        ] as ISideBarItem[],
    }),
    actions: {
        
    },
});