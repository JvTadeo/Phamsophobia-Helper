import { Request, Response } from 'express';
import { GetPhasmophobiaNewsUseCase } from '@/application/use-cases/GetPhasmophobiaNewsUseCase';
import { Logger } from '@/shared/utils/Logger';
import { asyncHandler } from '@/shared/utils/asyncHandler';

export class NewsController {
  private getPhasmophobiaNewsUseCase: GetPhasmophobiaNewsUseCase;

  constructor() {
    this.getPhasmophobiaNewsUseCase = new GetPhasmophobiaNewsUseCase();
  }

  // 🎯 Sem try/catch, sem next() - só a lógica pura!
  public getNews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const limitParam = req.query.limit;
    const limit = limitParam ? Number(limitParam) : 5;

    Logger.debug('News request received', {
      limit,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    // ✨ Se der erro aqui, é automaticamente capturado!
    const news = await this.getPhasmophobiaNewsUseCase.execute(limit);

    Logger.success('News request completed successfully', {
      newsCount: news.length
    });

    res.json({
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      data: news,
      count: news.length
    });
  });
}
