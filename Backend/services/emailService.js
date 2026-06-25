import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendInterviewReminder = async (
  email,
  company,
  role,
  interviewDate
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Interview Reminder",
      html: `
        <h2>Upcoming Interview</h2>

        <p>
          You have an interview with
          <b>${company}</b>
          for the role of
          <b>${role}</b>
        </p>

        <p>
          Interview Date:
          ${new Date(interviewDate).toDateString()}
        </p>
      `,
    });

    console.log("Reminder email sent");
  } catch (error) {
    console.log(error);
  }
};