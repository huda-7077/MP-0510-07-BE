import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import accountRouter from "./routes/account.router";
import authRouter from "./routes/auth.router";
import eventRouter from "./routes/event.router";
import reviewRouter from "./routes/review.router";
import rewardsRouter from "./routes/rewards.router";
import transactionRouter from "./routes/transaction.router";
import userRouter from "./routes/user.router";
import voucherRouter from "./routes/voucher.router";
import dashboardAdminRouter from "./routes/dashboard-admin.router";
import dashboardOrganizerRouter from "./routes/dashboard-organizer.router";
import "./scripts/pointsExpiryScheduler";
import "./lib/scheduler";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      /http:\/\/localhost/,
      "https://starticket.muhammadmasyhuda.my.id",
      "https://starticket.vercel.app",
    ],
  }),
);
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to Starticket API");
});

//routes
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/events", eventRouter);
app.use("/vouchers", voucherRouter);
app.use("/transactions", transactionRouter);
app.use("/user", userRouter);
app.use("/rewards", rewardsRouter);
app.use("/reviews", reviewRouter);
app.use("/dashboard-admin", dashboardAdminRouter);
app.use("/dashboard-organizer", dashboardOrganizerRouter);

// middleware error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send(err.message);
});

export default app;
