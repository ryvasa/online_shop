import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import stripeRoute from "./routes/stripeRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";
import subscribeRoute from "./routes/subscribeRoute.js";
import refreshTokenRoute from "./routes/refreshTokenRoute.js";
import cookieParser from "cookie-parser";
import expressWinston from "express-winston";
import { transports, format } from "winston";
import logger from "./logger.js";
import cors from "cors";

dotenv.config();
const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

const myFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp}, ${level} : ${meta.message}`;
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: "logsInternalError.log",
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), myFormat),
  })
);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);
app.use(userRoute);
app.use(authRoute);
app.use(productRoute);
app.use(cartRoute);
app.use(stripeRoute);
app.use(orderRoute);
app.use(refreshTokenRoute);
app.use(subscribeRoute);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
