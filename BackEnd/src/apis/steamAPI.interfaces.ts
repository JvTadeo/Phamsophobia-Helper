export type ISteamAPI = {
    steamNews: ISteamNews[]
    steamPlayerCount: number
}

type ISteamNews = {
    id: string;
    title: string;
    url: string;
    author: string;
    date: string;
}