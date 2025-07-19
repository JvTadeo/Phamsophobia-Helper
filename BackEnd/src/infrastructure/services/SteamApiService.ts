import axios, { AxiosInstance } from 'axios';
import { Logger } from '@/shared/utils/Logger';

interface SteamNewsResponse {
  appnews: {
    newsitems: SteamNewsItem[];
  };
}

interface SteamNewsItem {
  gid: string;
  title: string;
  contents: string;
  author: string;
  date: number;
  url: string;
}

export class SteamApiService {
  private steamApi: AxiosInstance;
  private readonly PHASMO_APP_ID = '739630';

  constructor() {
    this.steamApi = axios.create({
      baseURL: 'https://api.steampowered.com',
      timeout: 10000,
      headers: {
        'User-Agent': 'Phasmophobia-Helper/1.0.0'
      }
    });
  }

  async getPhasmophobiaNews(limit: number = 5): Promise<SteamNewsItem[]> {
    Logger.info('Fetching Phasmophobia news from Steam', { limit });

    const response = await this.steamApi.get<SteamNewsResponse>('/ISteamNews/GetNewsForApp/v0002/', {
      params: {
        appid: this.PHASMO_APP_ID,
        count: limit,
        maxlength: 300,
        format: 'json'
      }
    }).catch(error => {
      Logger.error('Failed to fetch Steam news', error);
      throw new Error('Steam API is currently unavailable');
    });

    const newsItems = response.data.appnews.newsitems;
    Logger.success('Successfully fetched Steam news', { count: newsItems.length });

    return newsItems;
  }
}
