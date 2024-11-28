import { Router } from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL, // Fixed typo here
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
    console.error("Error in /test route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// POST route to generate a new short URL
router.post("/url", handleGenerateNewShortURL);

// Redirect to the original URL based on the short ID
router.get("/:shortId", handleRedirectURL);

// Analytics route
router.get("/url/:shortId", handleGetAnalytics);

export default router;
