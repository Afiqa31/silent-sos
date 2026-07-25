const dotenv = require("dotenv");

dotenv.config();


const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const alertRoutes = require("./routes/alertRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");


console.log("EMAIL USER:", process.env.EMAIL_USER);


const app = express();


connectDB();


// Middleware

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);


app.use(express.json());



// Home Route

app.get("/", (req,res)=>{

    res.json({

        success:true,

        message:"🚨 Silent SOS Backend Running Successfully"

    });

});



// Routes

app.use("/api/auth", authRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/alerts", alertRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});