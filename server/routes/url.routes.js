import { Router } from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  hanlderedirectURL,
} from "../controllers/url.controllers.js";

const router = Router();

router.post("/url", handleGenerateNewShortURL);

router.get("/:shortId", hanlderedirectURL);
router.get("/url/:shortId", handleGetAnalytics);

export default router;
