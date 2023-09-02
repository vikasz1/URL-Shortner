const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url is required" });
  const shortId = shortid(9);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url, 
    visitHistory: [],
  });
 
  return res.json({ id: shortId })
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId })
  console.log(result)
  return res.json({ totalClicks: result.visitHistory.length, analytics : result.visitHistory})
}
async function handleRedirectUser(req,res){
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, { 
    $push: {
      visitHistory:{
        timestamp: Date.now()
      }
    }
  })
  res.redirect(entry.redirectURL)
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectUser
}