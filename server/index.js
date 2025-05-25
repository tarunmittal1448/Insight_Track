const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/authRoute");
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const allowedOrigins = [
  "https://insight-track.vercel.app",
  "https://insight-track.onrender.com",
  "http://localhost:3000" // Optional: for local testing
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use("/api/auth", router);

mongoose
.connect(process.env.MONGO)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(`MongoDB not connected ${err}`));

app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    });
});

app.listen(3000, ()=>{
    console.log("App is started at port 3000");
})
