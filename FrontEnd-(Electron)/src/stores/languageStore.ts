import { defineStore } from "pinia";

export const useLanguageStore = defineStore('language', {
    state: () => ({
        languageSelected: {
            code: 'us',
            label: 'English'
        } as { code: string, label: string, icon?: string },
        languageList: [
            { code: 'en', label: 'English', icon: 'us' },
            { code: 'pt_br', label: 'Português', icon: 'br' },
        ] as Array<{ code: string, label: string, icon?: string }>
    }),
    actions: {
        changeLanguage(code: string) {
            this.languageSelected = this.languageList.find(l => l.code === code) || this.languageSelected
            
            // Save on local storage
            localStorage.setItem('language', code)
        },
    }
});