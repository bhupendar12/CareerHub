export default function InterviewCard({
  applications,
}) {

  const interviews =
    applications.filter(
      (app) => app.status === "Interview"
    );

  return (

    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-5 text-black dark:text-white">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">

        {interviews.length > 0 ? (

          interviews.map((item) => (

            <div
              key={item._id}
              className="bg-purple-50 dark:bg-slate-700 rounded-2xl p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {item.company}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                    {item.role}
                  </p>

                </div>

                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                  Interview
                </span>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center py-8 text-gray-500 dark:text-gray-400">

            No upcoming interviews

          </div>

        )}

      </div>

    </div>

  );
}