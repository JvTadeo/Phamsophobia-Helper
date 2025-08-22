import { Router } from 'express';
import { HealthController } from '@/presentation/controllers/HealthController';
import { NewsController } from '@/presentation/controllers/NewsController';
import { GetHealthStatusUseCase } from '@/application/use-cases/GetHealthStatusUseCase';

// Dependency injection
const getHealthStatusUseCase = new GetHealthStatusUseCase();
const healthController = new HealthController(getHealthStatusUseCase);
const newsController = new NewsController();

const router = Router();

// Health check route
router.get('/health', (req, res) => healthController.getHealth);

// Phasmophobia news route
router.get('/news', newsController.getNews);

export { router as routes };
