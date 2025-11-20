import express from "express";
import bodyParser from "body-parser"
import webhookRouter from "./routes/webhook.js";
import reviewsRouter from "./routes/review.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/webhook", webhookRouter);
app.use("/api/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the WhatsApp Review App!");
  console.log("backend is working fine till this point ")
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





