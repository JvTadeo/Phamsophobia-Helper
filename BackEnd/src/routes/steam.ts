import { Router } from "express";
import { SteamController } from "@/features/steam/steam.controller";

const router = Router();
const steamController = new SteamController();

router.get("/news", steamController.getNewsPhasmophobia)
router.get("/players", steamController.getPlayersCount)

export default router;