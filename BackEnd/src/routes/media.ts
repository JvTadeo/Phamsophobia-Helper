import { Router } from "express";
import { MediaController } from "@/features/media/media.controller";

const router = Router();
const mediaController = new MediaController();

router.get("/", mediaController.getMedia);

export default router;