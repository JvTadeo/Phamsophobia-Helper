import type { Component } from "vue";

export interface ISideBarItem {
    name: string;
    route?: string;
    icon: Component;
    action? : () => void
}

export interface ITimeDividers {
    position: number;
    label: string;
}