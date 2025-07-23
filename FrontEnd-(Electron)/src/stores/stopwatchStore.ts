import { defineStore } from "pinia";
import type { ITimeDividers } from "@/interface/ITimeDividers";

export const useStopwatchStore = defineStore("stopwatch", {
    state: () => ({
        timerDividers: [
            {
                label: "Demon",
                position: 57
            },
            {
                label: "",
                position: 86
            },
            {
                label: "Spirit",
                position: 172
            }
        ] as ITimeDividers[],
    }),
    actions: {}
});