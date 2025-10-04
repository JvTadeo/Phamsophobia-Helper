import { createI18n } from "vue-i18n";

const messages = {
    en: {
        Navbar: {
            toolbox: 'Toolbox',
            media: 'Medias',
            ghosts: 'Ghosts'
        },
        Steam: {
            playerCount: 'Playing right now'
        },
        GenericActions: {
            search: 'Search',
            select_evidence: 'Select evidences',
            loading: 'Loading'
        },
        ToolBoxSection: {
            Stopwatch: {
                title: 'Stopwatch',
                tooltip: 'Press F1 to start/stop the stopwatch'
            }
        },
        MediaSection: {
            duplicate: 'Duplicate',
            unique: 'Unique'
        },
        GhostInfoSection: {
            tells: 'Informations',
            abilities: 'Abilities',
            behaviours: 'Behaviours',
            hunt: 'Hunt'
        },
        LoadingSection: {
            loading: 'Loading'
        }
    },
    pt_br: {
        Navbar: {
            toolbox: 'Ferramentas',
            media: 'Medias',
            ghosts: 'Fantasmas'
        },
        Steam: {
            playerCount: 'Jogando agora'
        },
        GenericActions: {
            search: 'Pesquisar',
            select_evidence: 'Selecione as evidencias',
            loading: 'Carregando'
        },
        ToolBoxSection: {
            Stopwatch: {
                title: 'Cronômetro',
                tooltip: 'Pressione F1 para iniciar/parar o cronômetro'
            }
        },
        MediaSection: {
            duplicate: 'Duplicado',
            unique: 'Único'
        },
        GhostInfoSection: {
            tells: 'Dicas',
            abilities: 'Habilidades',
            behaviours: 'Comportamentos',
            hunt: 'Caça'
        }
    },
};

export const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "us",
    messages,
});
