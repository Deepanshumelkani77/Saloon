require('dotenv').config();
const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");



//app config
const app=express();
const port = process.env.PORT || 1000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



// Load strategies
require("./auth/google");
require("./auth/googleAdmin");

// Models
const User = require("./models/User");
const Admin = require("./models/Admin");





// Session middleware for passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Serialize + Deserialize (supports both User & Admin)
passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (obj, done) => {
  try {
    let user;
    if (obj.role === "admin") {
      user = await Admin.findById(obj.id);
    } else {
      user = await User.findById(obj.id);
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});








//database connection
const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
      process.exit(1);
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
const productRouter=require("./routes/Product.js")
const cartRouter=require("./routes/Cart.js");
const orderRouter=require("./routes/Order.js");
const feedbackRouter=require("./routes/feedback.js");
app.use("/user",user);
app.use("/appointment",appointment);
app.use("/payment", paymentRouter);
app.use("/service", serviceRouter);
app.use("/stylist", stylistRouter);
app.use("/admin", adminRouter);
app.use("/product",productRouter);
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
app.use("/feedback",feedbackRouter)





// Start Google login fro user
app.get("/auth/google/user",
  passport.authenticate("google-user", { scope: ["profile", "email"] })
);

// Google callback
app.get(
  "/auth/google/user/callback",
  passport.authenticate("google-user", { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Redirect to frontend with token and user info
    res.redirect(
      `${process.env.FRONTEND_URL}/?token=${token}&id=${req.user._id}&name=${req.user.username}&email=${req.user.email}`
    );
  }
);




//passport have req.user object where user info is stored after login not req.admin
// Start Google login for admin
app.get("/auth/google/admin",
  passport.authenticate("google-admin", { scope: ["profile", "email"] })
);

// Google callback
app.get(
  "/auth/google/admin/callback",
  passport.authenticate("google-admin", { failureRedirect: `${process.env.ADMIN_URL}/login` }),
  (req, res) => {
    // Passport stores user/admin always in req.user
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Redirect to ADMIN frontend with token and admin info
    res.redirect(
      `${process.env.ADMIN_URL}/?token=${token}&id=${req.user._id}&name=${req.user.username}&email=${req.user.email}`
    );
  }
);

