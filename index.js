const express = require("express");
const app = express();

const urlRoute = require("./routers/url");
const { startConnection } = require("./connection.js");
const PORT = 8001;
const URL = require('./models/url')

app.use(express.json())


startConnection("mongodb://localhost:27017/url-shortner")
app.use("/url", urlRoute);



app.listen(PORT, () => {
  console.log(`Server started listening at ${PORT}`);
});
