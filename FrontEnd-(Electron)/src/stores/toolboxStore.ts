import { defineStore } from "pinia";
import type { IToolBoxItem } from "@/interface/toolbox-store.interface";
import { Clock } from "lucide-vue-next";

export const useToolBoxStore = defineStore("toolbox", {
    state: () => ({
        itens : [
            {
                name: "ToolBoxSection.Stopwatch.title",
                tooltip: "ToolBoxSection.Stopwatch.tooltip",
                icon: Clock,
                action: () => {
                    window.electronAPI.stopwatch.show();
                }
            }
        ] as IToolBoxItem[],
    }),
});