import { defineStore } from "pinia";
import type { IMediaType } from "@/interface/mediaStore.interface";
import { ServerAPI } from "@/api/ServerAPI";

export const useMediaStore = defineStore("media", {
    state: () => ({
        types: [] as IMediaType[],
    }),
    actions: {
        async getMedias() {
            await ServerAPI.getMedias()
            .then(({ data }) => {
                this.types = data;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
});