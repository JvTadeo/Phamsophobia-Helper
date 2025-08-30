export type ISteamAPI = {
    steamNews: ISteamNews[]
}

type ISteamNews = {
    id: string;
    title: string;
    url: string;
    author: string;
    date: string;
}