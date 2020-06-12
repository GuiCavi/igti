import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";

import GradesRoute from "./routes/grades.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

app.use("/grades", GradesRoute);

export default app;
