const express = require("express");

const router = express.Router();

const { handleGenerateNewShortURL,handleGetAnalytics,hand, handleRedirectUser } = require("../controllers/url");
router.post("/", handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics)
router.get('/:shortId',handleRedirectUser)


module.exports = router;
