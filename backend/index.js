const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend
require("./auth/google"); // import google strategy
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");

//app config
const app=express();
const port=1000;
// Session middleware for passport
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false
}));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

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
const appointment=require("./routes/Appointment.js");
const paymentRouter = require("./routes/Payment.js");
const serviceRouter = require("./routes/serviceRoutes.js");
const stylistRouter = require("./routes/stylistRoutes.js");
const adminRouter = require("./routes/Admin.js");
app.use("/user",user);
app.use("/appointment",appointment);
app.use("/payment", paymentRouter);
app.use("/service", serviceRouter);
app.use("/stylist", stylistRouter);
app.use("/admin", adminRouter);





// Start Google login
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.name },
      "your-jwt-secret",
      { expiresIn: "24h" }
    );

    // Redirect to frontend with token and user info
    res.redirect(
      `http://localhost:5173/?token=${token}&id=${req.user._id}&name=${req.user.name}&email=${req.user.email}`
    );
  }
);


