const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const nanoId = require("nanoid");
const urlShort = require("../models/urlShort");

const baseUrl = "http://cutit.azurewebsites.net";
const urlCode = nanoId.nanoid(3);

router.post("/", async (req, res) => {
  const originalUrl = req.body.originalUrl;
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }
  if (validUrl.isUri(originalUrl)) {
    try {
      let url = await urlShort.findOne({ originalUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new urlShort({
          originalUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
        console.log(url);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid Long Url");
  }
});

module.exports = router;
