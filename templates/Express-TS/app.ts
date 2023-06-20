import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

import indexRouter from "./routes/index";

const app = express();

// security configurations
app.disable("x-powered-by");

// cors is used for allowing which websites can make requests to the api
app.use(
    cors({
        origin: "*",
    })
);

// middlewares
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/", indexRouter);

// Error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    // you can also log the err argument for debbuging
    return res.status(500).json({ message: "An error occurred" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
