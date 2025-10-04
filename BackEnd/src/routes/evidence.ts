import { Router } from "express";
import { EvidenceController } from "@/features/evidence/evidence.controller";

const router = Router();
const evidenceController = new EvidenceController();

router.get("/", evidenceController.getEvidences);

export default router;