import dotenv from "dotenv";
dotenv.config();

import express, {
  Request,
  Response,
  NextFunction,
  json,
  urlencoded,
} from "express";
import createError, { HttpError } from "http-errors";
import cors from "cors";
import logger from "morgan";
import "./config/mongoose";

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";

import authRouter from "./routes/account/account";

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/account", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Invalid Url"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`server on ${port}`);
});

if (process.env.WEBPACK_ENV === "development") {
  console.log("Server is running on development mode");
  const config = require("../../webpack.config.dev.js");
  const devPort = config.devServer.port;
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, "localhost", (err) => {
    if (err) {
      console.log("webpack-dev-server failed to start", err);
    } else {
      console.log("webpack-dev-server is listening on port", devPort);
    }
  });
}

export default app;
