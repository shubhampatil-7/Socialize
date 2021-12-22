import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';

import multer from "multer"
import path from "path"
const __dirname = path.resolve();

//dotenv Configuration
dotenv.config()

//Mongoose Connection to database
mongoose.connect(process.env.MONGO_URL,() => {
    console.log("MongoDB Connected!!!")
});

const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    try {
        return res.status(200).json("file uploaded Successfully.")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//Server Port
const PORT = 8800 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is Running on: http://localhost:${PORT}`);
})