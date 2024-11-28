import { Router } from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  hanlderedirectURL,
} from "../controllers/url.controllers.js";
import Url from "../model/url.model.js";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    const allUrls = await Url.find({});

    return res.render("home", {
      urls: allUrls,
      host: req.headers.host,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/url", handleGenerateNewShortURL);

router.get("/:shortId", hanlderedirectURL);
router.get("/url/:shortId", handleGetAnalytics);

export default router;
