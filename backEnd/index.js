import express from "express";
import "./config/init-sequelize.js";
import mainRouter from "./routes/mainRouter.js";
import { configDbSession } from "./config/setupSession.js";

import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
configDbSession(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.listen(3000, () => {
  console.log("Development server has started, go to http://localhost/server/");
});
