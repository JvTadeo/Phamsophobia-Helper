import { Router } from "express";
import healthRouter from "./health-check";
import steamRouter from "./steam";
import mediaRouter from "./media";

const router = Router();

router.use('/health-check', healthRouter);
router.use('/steam', steamRouter);
router.use('/medias', mediaRouter);

export default router;