import { defineStore } from "pinia";
import type { IToolBoxItem } from "@/interface/toolBoxStore.interface";
import { Clock } from "lucide-vue-next";

export const useToolBoxStore = defineStore("toolbox", {
    state: () => ({
        itens : [
            {
                name: "Stopwatch",
                icon: Clock,
                action: () => {
                    window.electronAPI.stopwatch.show();
                }
            }
        ] as IToolBoxItem[],
    }),
});