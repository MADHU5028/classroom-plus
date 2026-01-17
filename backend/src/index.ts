import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

import express from "express";
import cors from "cors";
import meetingRoutes from "./routes/meetings";
import livekitRoutes from "./routes/livekit";

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (_req, res) => {
  res.send("Backend is alive");
});

app.use("/api/meetings", meetingRoutes);
app.use("/api/livekit", livekitRoutes);

const PORT = 5000;
app.listen(PORT,  () => {
   console.log(`Backend running on http://localhost:${PORT}`);
});
