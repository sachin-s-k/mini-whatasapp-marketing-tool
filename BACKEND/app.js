import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());
app.use("/campaign", campaignRoutes);
app.use(cors());
// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
