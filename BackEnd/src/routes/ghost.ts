import { Router } from "express";
import { GhostController } from "@/features/ghost/ghost.controller";

const router = Router();
const ghostController = new GhostController();

router.get("/", ghostController.getGhosts);
router.get("/:id", ghostController.getGhostById);

export default router;