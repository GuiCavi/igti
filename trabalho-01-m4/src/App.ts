import { AccountRouter } from "./routers";
import express from "express";
const app = express();

app.use(express.json());

app.use(AccountRouter.url, AccountRouter.router);

export default app;
