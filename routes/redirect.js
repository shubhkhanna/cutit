const express = require("express");
const router = express.Router();
const urlShort = require("../models/urlShort");

router.get("/:code", async (req, res) => {
  try {
    const url = await urlShort.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json("No Url found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
