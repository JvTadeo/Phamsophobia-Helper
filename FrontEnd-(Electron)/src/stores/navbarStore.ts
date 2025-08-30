import { defineStore } from "pinia";
import type { INavbarItem } from "@/interface/NavbarStore.interface";
import { Package, Camera } from "lucide-vue-next";

export const useNavbarStore = defineStore("navbar", {
    state: () => ({
        items: [
            {
                name: "ToolBox",
                icon: Package,
                route: "/toolbox",                                
            },
            {
                name: "Media",
                icon: Camera,
                route: "/media",
            }
        ] as INavbarItem[],
    }),
    actions: {
        
    },
});