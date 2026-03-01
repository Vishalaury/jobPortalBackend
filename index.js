import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "./utils/db.js";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js"
import jobRoutes from "./routes/job.route.js";
import  applicationRoute  from "./routes/application.route.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",

   credentials: true,

}
app.use(cors(corsOptions));

const PORT  = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Backend is running ");
});
// API
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoute);
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is runing on port ${PORT}`);
})