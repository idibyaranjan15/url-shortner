import { Router } from "express";
import { nanoid } from "nanoid";
import Url from "../model/url.model.js";
import { z } from "zod";

const urlValidation = z.object({
  longUrl: z.string().url(),
});

const shortUrlValidation = z.object({
  shortUrl: z.string().length(6),
});

const router = Router();

// POST /shorten - Shorten a URL
router.post("/shorten", async (req, res) => {
  try {
    const validation = urlValidation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    const { longUrl } = validation.data;

    let existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      return res.status(200).json({
        message: "URL already shortened",
        shortUrl: `${req.headers.host}/${existingUrl.shortUrl}`,
      });
    }

    let shortUrl;
    let urlExists;
    do {
      shortUrl = nanoid(6);
      urlExists = await Url.findOne({ shortUrl });
    } while (urlExists);

    const newUrl = new Url({ longUrl, shortUrl });
    await newUrl.save();

    return res.status(201).json({
      message: "URL shortened",
      shortUrl: `${req.headers.host}/${newUrl.shortUrl}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /shortUrl - Fetch original URL
router.post("/shortUrl", async (req, res) => {
  try {
    const validation = shortUrlValidation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid shortened URL" });
    }

    const { shortUrl } = validation.data;

    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(200).json({ longUrl: existingUrl.longUrl });
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /:shortUrl - Redirect to original URL
router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      return res.redirect(existingUrl.longUrl);
    } else {
      return res
        .status(404)
        .send("<h1>404 Not Found</h1><p>URL not found.</p>");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("<h1>500 Internal Server Error</h1>");
  }
});

export default router;
