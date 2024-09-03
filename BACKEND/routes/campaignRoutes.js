import express from "express";
import { upload } from "../milddlewares/multer.js";
import {
  createCampaign,
  uploadContact,
} from "../controllers/campaignController.js";

const routes = express.Router();

routes.post("/", createCampaign);
routes.post("/upload-contacts", upload.single("contacts"), uploadContact);

export default routes;
