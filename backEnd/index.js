import express from "express";
import "./config/init-sequelize.js";
import mainRouter from "./routes/mainRouter.js";
import { configDbSession } from "./config/setupSession.js";

const app = express();
configDbSession(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.listen(3000, () => {
  console.log("Development server has started, go to /server/");
});
