import { nanoid } from "nanoid";
import Url from "../model/url.model.js";
export const handleGenerateNewShortURL = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({
      error: "uri is required",
    });
  }
  const shortId = nanoid(8);
  await Url.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: [],
  });

  return res.status(200).json({ id: shortId });
};
export const handleRedirectURL = async (req, res) => {
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
  return res.redirect(entry.redirectURL);
};

export const handleGetAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const result = await Url.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
