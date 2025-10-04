import type { IMediaTypeAccordion, IMediaType } from "@/interface/media-store.interface";
import { defineStore } from "pinia";
import { eventBus } from "@/events/eventBus";
import { ServerAPI } from "@/api/ServerAPI";

export const useMediaStore = defineStore("media", {
    state: () => ({
        loading: false as boolean,
        types: [] as IMediaTypeAccordion[],
        search: '' as string,
    }),
    actions: {
        async initStore() {
            await this.initInformations()
            await this.initEvent()
        },
        // ---- Initialization Events
        async initEvent() {
            eventBus.on('language-changed', async ({path}) => {
                this.types = [];
                if (path !== '/media') return

                this.loading = true
                await this.getMedias();

                this.loading = false
            })
        },
        // ---- Async Events
        async initInformations() {
            this.loading = true
            await this.getMedias();
            this.loading = false
        },
        async getMedias() {
            if (this.types.length > 0) return
            
            this.loading = true
            
            await ServerAPI.getMedias()
            .then(({ data } : { data: IMediaType[] } ) => {
                this.types = data.map((type: IMediaType) => ({
                    mediaType: type,
                    expanded: undefined,
                    categoriesFiltered: type.categories
                }));
            })
            .catch((error) => {
                console.log(error);
            });

            this.loading = false
        },
        filteredCategories(value: string) {
            this.types.forEach((type) => {
                // Filter
                type.categoriesFiltered = type.mediaType.categories.filter(
                    (category) => category.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                );
                // Handle the expanded
                if (value == '') {
                    type.expanded = undefined;
                    return;
                }
                type.expanded = type.categoriesFiltered.length > 0 ? type.expanded = type.mediaType.id : undefined;
            })
        }
    }
});