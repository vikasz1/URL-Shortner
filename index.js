const express = require("express");
const app = express();
const path = require("path")


app.use(express.json())
app.use(express.urlencoded({extended:false}))


const urlRoute = require("./routers/url");
const { startConnection } = require("./connection.js");
app.use("/url", urlRoute);
const URL = require('./models/url')
const staticRoute = require('./routers/staticRouters')
 


app.use('/',staticRoute)

const PORT = 8001;

startConnection("mongodb://localhost:27017/url-shortner")
app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))




app.listen(PORT, () => {
  console.log(`Server started listening at ${PORT}`);
});
