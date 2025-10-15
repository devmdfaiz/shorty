import bodyParser from "body-parser";
import express from "express";
import redirectController from "@/presentation/controllers/redirect.controllers.js";
import globalErrorHandler from "./middlewares/error-handler.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import urlRouter from "./routes/url.route.js";

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(globalErrorHandler);
app.use(loggerMiddleware);

app.get("/:shortCode", redirectController);

app.use("/v1/url", urlRouter);

export default app;
