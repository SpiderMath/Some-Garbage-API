import express from "express";
import { config } from "dotenv";
config();
import Logger from "./Helpers/Logger";

const port = Number(process.env.PORT) || 3000;
const app = express();

app.listen(port, () => {
	Logger.success("server", `Listening for API Calls on Port: ${port}`);
});