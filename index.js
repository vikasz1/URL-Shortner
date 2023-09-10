const express = require("express");
const app = express();
const path = require("path")
const cookieParser  = require('cookie-parser')
const {restrictToLoggedUserOnly} = require('./middlewares/auth')

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

startConnection("mongodb://localhost:27017/url-shortner")
app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))




app.listen(PORT, () => {
  console.log(`Server started listening at ${PORT}`);
});
