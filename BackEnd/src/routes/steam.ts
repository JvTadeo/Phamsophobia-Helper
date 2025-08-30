import { Router } from "express";
import { SteamController } from "@/features/steam/steam.controller";

const router = Router();
const steamController = new SteamController();

router.get("/news", steamController.getNewsPhasmophobia)

export default router;