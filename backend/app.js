import express from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
e
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    
  })
)
app.use(express.json())
app.use(express.urlencoded({extended: true})) // nested objects if true
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/urls", urlRoutes);


app.use(errorHandler);

export default app;
