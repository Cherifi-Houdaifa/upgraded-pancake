import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
    res.send("<h1>Hello World<h1>");
});

export default router;
