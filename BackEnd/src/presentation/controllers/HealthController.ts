import { Request, Response } from 'express';
import { GetHealthStatusUseCase } from '@/application/use-cases/GetHealthStatusUseCase';
import { Logger } from '@/shared/utils/Logger';
import { asyncHandler } from '@/shared/utils/asyncHandler';

export class HealthController {
  constructor(
    private readonly getHealthStatusUseCase: GetHealthStatusUseCase
  ) { }

  getHealth = asyncHandler(async (req: Request, res: Response) => {
    Logger.debug('Health check requested', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    const healthStatus = this.getHealthStatusUseCase.execute();

    Logger.success('Health check completed successfully', {
      status: healthStatus.status,
      uptime: healthStatus.uptime
    });

    res.status(200).json(healthStatus);
  })
}
