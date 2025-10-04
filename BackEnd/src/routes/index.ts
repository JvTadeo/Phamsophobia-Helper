import { Router } from "express";
import healthRouter from "./health-check";
import steamRouter from "./steam";
import mediaRouter from "./media";
import ghostRouter from "./ghost";
import evidenceRouter from "./evidence";
import { languageMiddleware } from "@/middleware/language.middleware";

const router = Router();

router.use('/health-check', healthRouter);
router.use('/steam', steamRouter);

// Language Middleware
router.use(languageMiddleware);

router.use('/medias', mediaRouter);
router.use('/ghosts', ghostRouter);
router.use('/evidence', evidenceRouter);

export default router;