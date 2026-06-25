import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { getApplications } from "../services/applicationService";

export default function Calendar() {
  const [applications, setApplications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const interviewApplications = applications.filter(
    (app) =>
      app.status === "Interview" &&
      app.interviewDate
  );

  return (
    <div className="p-8 bg-gray-100 dark:bg-slate-950 min-h-screen">

      <div className="
        bg-white
        dark:bg-slate-800
        border
        border-gray-200
        dark:border-slate-700
        rounded-3xl
        shadow
        p-8
      ">

        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
          Interview Calendar
        </h1>

        <div className="text-black dark:text-white">

          <ReactCalendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) => {

              const hasInterview =
                interviewApplications.some((app) => {

                  const interviewDate =
                    new Date(app.interviewDate);

                  return (
                    interviewDate.toDateString() ===
                    date.toDateString()
                  );
                });

              return hasInterview
                ? "bg-purple-600 text-white rounded-full"
                : "";
            }}
          />

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
            Upcoming Interviews
          </h2>

          {interviewApplications.length > 0 ? (

            interviewApplications.map((app) => (

              <div
                key={app._id}
                className="
                  bg-purple-50
                  dark:bg-slate-700
                  p-4
                  rounded-2xl
                  mb-3
                "
              >

                <h3 className="font-semibold text-black dark:text-white">
                  {app.company}
                </h3>

                <p className="text-gray-500 dark:text-gray-300">
                  {app.role}
                </p>

                <p className="text-sm text-purple-600 mt-1">
                  {new Date(
                    app.interviewDate
                  ).toLocaleDateString()}
                </p>

              </div>

            ))

          ) : (

            <p className="text-gray-500 dark:text-gray-300">
              No interviews scheduled.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}