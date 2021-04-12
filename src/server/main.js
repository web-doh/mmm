import dotenv from "dotenv";
dotenv.config();
import path from "path";
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

import api from "./routes";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(express.static("build"));

app.use("/api", api);

app.get("/account/complete", (req, res) => {
  res.redirect("/not-found");
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "build", "index.html")
  );
});

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

export default app;
