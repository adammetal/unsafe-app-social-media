import express from "express";
import session from "express-session";
import cors from "cors";
import auth from "./auth.js";
import feed from "./feed.js";

const app = express();

app.use(express.json());

app.set("trust proxy", 1); // config
app.use(
  session({
    secret: "demo",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use("/auth", auth);

app.use("/api/feed", feed);

export default app;
