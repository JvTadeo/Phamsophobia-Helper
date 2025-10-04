import type { ISteamNews } from "@/interface/steam-api.interface";
import { ServerAPI } from "@/api/ServerAPI";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
    state: () => ({
        loading: false as boolean,
        playerCount: 0 as number,
        newsData: Array<ISteamNews>(),
    }),
    actions: {
        // ---- Async Events
        async getNews() {
            await ServerAPI.getNews()
                .then((response) => {
                    this.newsData = response.data;
                });
        },
        async getPlayerCount()
        {
            await ServerAPI.getPlayerCount()
            .then(({data}) => {
                this.playerCount = data as number
            })
        },
        // ---- Generics Actions
        openLink(link: string) {
            window.electronAPI.utils.openDefaultBrowser(link);
        },
        closeWindow() {
            window.electronAPI.window.close();
        },
        minimizeWindow() {
            window.electronAPI.window.minimize();
        },
    },
});