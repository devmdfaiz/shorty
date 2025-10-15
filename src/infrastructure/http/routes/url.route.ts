import express from "express";
import { createUrlController } from "@/presentation/controllers/create-url.controllers.js";
import { deleteUrlController } from "@/presentation/controllers/delete-url.controllers.js";
import { getUrlController } from "@/presentation/controllers/get-url.controllers.js";

const urlRouter = express.Router();

urlRouter.post("/create", createUrlController);
urlRouter.delete("/delete", deleteUrlController);
urlRouter.get("/get", getUrlController);

export default urlRouter;
