import type { IGhost } from "@/interface/ghost.interface";
import { eventBus } from "@/events/eventBus";
import { defineStore } from "pinia";
import { ServerAPI } from "@/api/ServerAPI";
import { useLanguageStore } from "./languageStore";
import { Dot, BookOpen, AudioLines, RectangleEllipsis, ThermometerSnowflake, Fingerprint, Radiation } from "lucide-vue-next";
import { axiosCustom } from "@/api/AxiosCustom";

const iconMap: Record<string, any> = {
    Dot,
    BookOpen,
    AudioLines,
    RectangleEllipsis,
    ThermometerSnowflake,
    Fingerprint,
    Radiation
}

export const useGhostStore = defineStore("ghost", {
    state: () => ({
        loading: false as boolean,
        ghosts: [] as IGhost[],
        filteredGhosts: [] as IGhost[],
        ghostSelected: {} as IGhost,
        evidences: [] as Array<{
            name: string,
            icon: string
        }>,
        evidencesSelected: [] as string[],
        iconMap: iconMap
    }),
    actions: {
        // ---- Initialization Events
        async initStore() {
            await this.initInformations()
            await this.initEvent()
        },
        async initEvent() {
            eventBus.on('language-changed', async ({ path }) => {
                this.ghosts = [];
                this.evidences = [];

                if (path !== '/ghost') return
                this.loading = true
                window.electronAPI.ghost.loading(true);

                await this.getGhosts()
                await this.getEvidences()
                this.loading = false

                const value = useLanguageStore().languageSelected.code
                window.electronAPI.ghost.languageUpdate(value);
                console.log('Eu sou um cara bunitão');
            })
        },
        // ---- Async Events
        async initInformations() {
            this.loading = true

            await this.getGhosts()
            await this.getEvidences()

            this.loading = false
        },
        async getGhosts() {
            if (this.ghosts.length > 0) return

            await ServerAPI.getGhosts().then(({ data }) => {
                this.ghosts = data
                this.filteredGhosts = data
            });
        },
        async getEvidences() {
            if (this.evidences.length > 0) return;

            await ServerAPI.getEvidences()
                .then(({ data }) => {
                    this.evidences = data
                })
        },
        async getGhostById(id: string) {
            // Open the Ghost Modal
            window.electronAPI.ghost.show();
            window.electronAPI.ghost.loading(true);

            const { data } = await ServerAPI.getGhostById(id)
            setTimeout(() => {
                window.electronAPI.ghost.update(data);
            }, 1000)
        },
        async getGhostByIdIsolated(id: string, language: string) {
            axiosCustom.defaults.headers.common['language_code'] = language;
            return await ServerAPI.getGhostById(id)
        },
        // ---- Filters
        filterEvidences(evidences: string[]) {
            this.filteredGhosts = this.ghosts.filter((ghost) => {
                return evidences.every((evidence) => ghost.evidences.find((e) => e.name === evidence));
            })

            this.evidencesSelected = evidences
        },
        filterSearch(search: string) {
            // Filter by evidences
            if (this.evidencesSelected.length > 0) {
                this.filteredGhosts = this.ghosts.filter((ghost) => {
                    return ghost.name.toLowerCase().includes(search.toLowerCase())
                        && this.evidencesSelected.every((evidence) => ghost.evidences.find((e) => e.name === evidence));
                })
                return;
            }

            // Filter by name if evidences are not selected
            this.filteredGhosts = this.ghosts.filter((ghost) => {
                return ghost.name.toLowerCase().includes(search.toLowerCase());
            })
        },
        // ---- Modal
        closeModalGhost() {
            window.electronAPI.ghost.close();
        },
        minimizeModalGhost() {
            window.electronAPI.ghost.minimize();
        },
    },
});