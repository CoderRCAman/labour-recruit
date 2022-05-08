require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); 
const cookieParser = require('cookie-parser') ;
const LandingRoutes = require('./Routes/Landing') ;
const LoginRoutes = require('./Routes/Login') ;
const CatRoutes = require('./Routes/LabByCat') ; 
const addRoutes = require('./Routes/Add') ; 
const crudRoutes = require('./Routes/Crud') ;
const ReqRoutes = require('./Routes/Request') ;
const morgan = require('morgan')
const path = require('path') ;
const session = require("express-session");
const app = express();
const port = 5000;

// If using a cloud based solution replace 'mongodb://localhost:27017/express-mongoose-template'
// with the connection string supplied by your cloud supplier.
mongoose.connect(
  "mongodb+srv://labor:1234@cluster0.pdrm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
.then(()=>{
  console.log(">>>> DATABASE CONNECTED <<<<") ;
})
.catch((error)=>{
  console.log("Something went wrong",'\n',error) ;
})

app.use(
  session({
    secret: "some random key to hash it",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser()) ;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set("view engine", "ejs"); 
app.use(morgan("tiny"));
app.use(LandingRoutes,LoginRoutes,CatRoutes,addRoutes,crudRoutes,ReqRoutes) ;
app.listen(port, () => console.log(`>>>> Server started on port ${port} <<<<`));
