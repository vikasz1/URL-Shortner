const express = require("express");
const app = express();
const path = require("path")
require('dotenv').config()
const cookieParser  = require('cookie-parser')
const {restrictToLoggedUserOnly} = require('./middlewares/auth')
const mongo_url= process.env.MONGO_URI

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


const { startConnection } = require("./connection.js");

const urlRoute = require("./routers/url");
const staticRoute = require('./routers/staticRouters')
const userRoute =  require('./routers/user')
  

app.use("/url",restrictToLoggedUserOnly, urlRoute);
app.use('/',staticRoute)
app.use('/user',userRoute) 

const PORT = 8001;

startConnection(mongo_url)
app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))




app.listen(PORT, () => {
  console.log(`Server started listening at ${PORT}`);
});
