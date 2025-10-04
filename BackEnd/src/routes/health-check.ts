import { Router } from "express";
import { HealthCheckController } from "@/features/health-check/healtch-check.controller";

const healthCheckController = new HealthCheckController();
const router = Router();

router.get("/", healthCheckController.healthCheck);

export default router;