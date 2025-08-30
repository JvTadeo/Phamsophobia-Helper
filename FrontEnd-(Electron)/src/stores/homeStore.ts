import type { ISteamNews } from "@/interface/SteamAPI.interface";
import { ServerAPI } from "@/api/ServerAPI";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
    state: () => ({
        newsData: Array<ISteamNews>(),
    }),
    actions: {
        async getNews() {
            await ServerAPI.getNews()
                .then((response) => {
                    this.newsData = response.data;
                });
        },
        openLink(link: string) {
            window.electronAPI.openDefaultBrowser(link);
        },
        closeWindow() {
            window.electronAPI.close();
        },
        minimizeWindow() {
            window.electronAPI.minimize();
        },
    },
});