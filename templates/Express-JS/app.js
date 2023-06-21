const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const indexRouter = require("./routes/index");

const app = express();

// Security best practices
app.disable("x-powered-by");

// cors is used for allowing which websites can make requests to the api
app.use(
    cors({
        origin: "*",
    })
);

// App middlewares
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use(function (err, req, res, next) {
    return res.status(500).json({ message: "An error occurred" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
