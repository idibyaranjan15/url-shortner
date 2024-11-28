import { nanoid } from "nanoid";
import Url from "../model/url.model.js";

export const handleGenerateNewShortURL = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        error: "uri is required",
      });
    }
    const entry = await Url.findOne({ url });
    if (entry) {
      return res.status(409).json({
        message: "Already shortened",
      });
    }
    const shortId = nanoid(8);
    await Url.create({
      shortId: shortId,
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(200).json({ id: shortId });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

export const handleRedirectURL = async (req, res) => {
  try {
    const { shortId } = req.params;
    const entry = await Url.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({
        error: "Short URL not found",
      });
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

export const handleGetAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    const result = await Url.findOne({ shortId });
    if (!result) {
      return res.status(404).json({
        error: "Short URL not found",
      });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};
