import express from "express";
import { config } from "dotenv";
config();
import Logger from "./Helpers/Logger";
import Authenticate from "./Middlewares/Authenticate";
// @ts-ignore
import ImageRouter from "./Routers/Image/ImageRouter";

const port = Number(process.env.PORT) || 3000;

const app = express();

app.listen(port, () => {
	Logger.success("server", `Listening for API Calls at Port: ${port}`);
});

app.use(Authenticate);
app.use("/api/image", ImageRouter);