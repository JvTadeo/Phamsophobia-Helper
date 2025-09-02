import { defineStore } from "pinia";
import type { ITimeDividers } from "@/interface/toolBoxStore.interface";

enum StopwatchState {
    STOPPED,
    RUNNING,
    RESET
}

export const useStopwatchStore = defineStore("stopwatch", {
    state: () => ({
        time: 0 as number, // in ms
        intervalId: null as number | null,
        stopwatchState: StopwatchState.STOPPED,
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
        ] as ITimeDividers[]
    }),
    getters: {
        formattedTime(): string {
            const minutes = Math.floor(this.time / 60000);
            const seconds = Math.floor((this.time % 60000) / 1000);
            const milliseconds = Math.floor((this.time % 1000) / 10);

            const pad = (n: number) => n.toString().padStart(2, "0");
            return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
        },
        progressValue() : number {
            let value = (this.time / 180000) * 100;

            if (value > 100) value = 100;

            return value; 
        }
    },
    actions: {
        handleStopwatchState() {
            // Switch the State
            switch (this.stopwatchState) {
                case StopwatchState.STOPPED:
                    this.stopwatchState = StopwatchState.RESET;
                    break;
                case StopwatchState.RUNNING:
                    this.stopwatchState = StopwatchState.STOPPED;
                    break;
                case StopwatchState.RESET:
                    this.stopwatchState = StopwatchState.RUNNING;
                    break;
            }

            // Running State
            if (this.stopwatchState === StopwatchState.RUNNING) {
                this.start();
                return;
            }
            // Stopped State
            if (this.stopwatchState === StopwatchState.STOPPED) {
                this.stop();
                return;
            }

            // Reset State
            this.reset();
        },
        start() {        
            this.intervalId = setInterval(() => {
                this.time += 10; // in ms
            }, 10);
        },
        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },
        reset() {
            stop();
            this.time = 0;
        }

    }
});