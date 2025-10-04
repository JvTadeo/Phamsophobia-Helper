import type { Component } from "vue"

export interface INavbarItem {
    name: string,
    route: string,
    icon: Component
}