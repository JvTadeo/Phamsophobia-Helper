import { HealthStatus } from '@/domain/entities/Health';

export class GetHealthStatusUseCase {
  execute(): HealthStatus {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime()
    };
  }
}
