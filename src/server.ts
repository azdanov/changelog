import cors from "cors";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import morgan from "morgan";
import { createNewUser, signin } from "./handlers/user";
import { protect } from "./modules/auth";
import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use(
  (
    err: Error & { type: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    if (err.type === "auth") {
      res.status(401);
      res.json({ message: "unauthorized" });
    } else if (err.type === "input") {
      res.status(400);
      res.json({ message: err });
    } else {
      res.status(500);
      res.json({ message: "internal server error" });
    }
  }
);

export default app;
