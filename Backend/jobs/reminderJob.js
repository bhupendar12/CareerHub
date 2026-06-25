import cron from "node-cron";
import Application from "../models/Application.js";
import User from "../models/User.js";
import { sendInterviewReminder } from "../services/emailService.js";

cron.schedule("0 9 * * *", async () => {
  console.log("Checking interviews...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const start = new Date(tomorrow);
  start.setHours(0, 0, 0, 0);

  const end = new Date(tomorrow);
  end.setHours(23, 59, 59, 999);

  const applications = await Application.find({
    status: "Interview",
    interviewDate: {
      $gte: start,
      $lte: end,
    },
  });

  for (const app of applications) {
    const user = await User.findById(app.user);

    if (user) {
      await sendInterviewReminder(
        user.email,
        app.company,
        app.role,
        app.interviewDate
      );
    }
  }
});