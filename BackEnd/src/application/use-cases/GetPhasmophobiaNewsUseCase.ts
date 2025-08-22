import { PhasmophobiaNews } from '@/domain/entities/PhasmophobiaNews';
import { SteamApiService } from '@/infrastructure/services/SteamApiService';
import { Logger } from '@/shared/utils/Logger';
import { removeTagsHtml } from '@/shared/utils/htlmUtils';

export class GetPhasmophobiaNewsUseCase {
  private steamApiService: SteamApiService;

  constructor() {
    this.steamApiService = new SteamApiService();
  }

  async execute(limit: number = 5): Promise<PhasmophobiaNews[]> {
    // Validação
    if (limit <= 0 || limit > 20) {
      Logger.warn('Invalid news limit requested', { limit });
      throw new Error('Limit must be between 1 and 20');
    }

    // Buscar dados do Steam (se der erro, vai automaticamente para o controller)
    const steamNews = await this.steamApiService.getPhasmophobiaNews(limit);

    // Transformar para o formato da aplicação
    const transformedNews: PhasmophobiaNews[] = steamNews.map(item => ({
      id: item.gid,
      title: item.title,
      content: removeTagsHtml(item.contents),
      author: item.author,
      publishedAt: new Date(item.date * 1000).toISOString(),
      url: item.url
    }));

    return transformedNews;
  }
}
