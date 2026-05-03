
const express=require("express");
require("dotenv").config();
const app=express();
const port=process.env.port||3000
const mongoose=require("mongoose");
const URL=process.env.MONGO_URL;
const session=require("express-session");
const users=require("./src/models/userschema");
const dbconnect=require("./src/config/dbconnect");
const resumeroutes=require("./src/routes/resumeroutes");
const authroutes=require("./src/routes/authroutes")
const userroutes=require("./src/routes/userroutes")
const quizroutes=require("./src/routes/quijroutes");
const pyqroutes=require("./src/routes/pyqroutes");
const chatroutes=require("./src/routes/chatroutes")
const cors=require("cors");
const verifytoken=require("./src/midleware/authmiddleware");
const errorhandler = require("./src/midleware/errorhandler");
const askGemini=require("./src/config/gemini");
const cookieparser=require("cookie-parser");
const passport=require("passport");
const Subjects=require("./src/models/subjectschema");
const Data=require("./src/seed/data.seed");
require("./src/config/passport");

const initdata=
// JSON body parse karne ke liye
dbconnect();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:["http://localhost:5173","https://prephub-frontend-xi.vercel.app"],
    credentials:true
}
))
app.use(passport.initialize());
// Agar form-data bhejna ho to ye bhi kaam aata hai
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
    console.log("the server is runing on port 3000");
})
app.get("/",(req,res)=>{
    res.send("helo krishna");
})
app.get("/initdata",async(req,res)=>{
        try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).send("Not allowed in production");
    }

    const subject = await Subjects.insertMany(Data);

    console.log("subject data saved");

    res.status(200).json(subject);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting data");
  }
}
)
app.use(session({
    secret:"mysecret",
    saveUninitialized:true,
    resave:false,
}))

// routes 
app.use("/auth",authroutes);
// app.use("/api",userroutes);
app.use("/api",quizroutes);
app.use("/api",pyqroutes);
app.use("/api", chatroutes);
app.use("/api",resumeroutes);
app.use(errorhandler);