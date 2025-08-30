const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend
require("./auth/google"); // import google strategy 

//app config
const app=express();
const port=1000;
app.listen(port,()=>{
    console.log("server is running",port);
})




//database connection
const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
      await mongoose.connect(
"mongodb+srv://deepumelkani123_db_user:bhumi77@cluster0.ghgjitk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };
//db connectin model
connectDB();


//middleware
app.use(express.json()); //we send request frontend to backend
app.use(cors());  //using this we access the backend from any frontend
const { ObjectId } = require('mongodb');



//router
const user=require("./routes/User.js");
app.use("/user",user);


//425613609140-eqbaqdekvfg1gaefqbmsff3001l1uj4v.apps.googleusercontent.com =id
//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=secreat





// Start Google login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect with token (JWT or session)
    res.redirect("http://localhost:3000/dashboard"); 
  }
);