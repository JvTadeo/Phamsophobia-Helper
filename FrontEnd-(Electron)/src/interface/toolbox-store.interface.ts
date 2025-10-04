import type { Component } from "vue";

export interface IToolBoxItem {
    name: string;
    tooltip?: string;
    icon: Component;
    action : () => void
}

export interface ITimeDividers {
    position: number;
    label: string;
}