import { defineStore } from "pinia";
import type { INavbarItem } from "@/interface/navbar-store.interface";
import { Package, Camera, Ghost } from "lucide-vue-next";

export const useNavbarStore = defineStore("navbar", {
    state: () => ({
        items: [
            {
                name: "Navbar.toolbox",
                icon: Package,
                route: "/toolbox",                                
            },
            {
                name: "Navbar.media",
                icon: Camera,
                route: "/media",
            },
            {
                name: "Navbar.ghosts",
                icon: Ghost,
                route: "/ghost",
            }
        ] as INavbarItem[],
    }),
    actions: {
        
    },
});