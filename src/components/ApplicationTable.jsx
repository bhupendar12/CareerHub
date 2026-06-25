const companyLogos = {
  Google: "google.com",
  Microsoft: "microsoft.com",
  Amazon: "amazon.com",
  Netflix: "netflix.com",
  Apple: "apple.com",
  Meta: "meta.com",
  IBM: "ibm.com",
  Infosys: "infosys.com",
  TCS: "tcs.com",
  Wipro: "wipro.com",
  Accenture: "accenture.com",
};

export default function ApplicationTable({
  applications,
  searchTerm,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-100 text-yellow-700";

      case "Interview":
        return "bg-purple-100 text-purple-700";

      case "Selected":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredApplications = applications.filter(
    (item) =>
      item.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.status
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-sm p-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Applications
        </h2>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400">

              <th className="text-left py-4 font-semibold">
                Company
              </th>

              <th className="text-left py-4 font-semibold">
                Role
              </th>

              <th className="text-left py-4 font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredApplications.length > 0 ? (

              filteredApplications.map((item) => {

                const domain =
                  companyLogos[item.company];

                return (

                  <tr
                    key={item._id}
                    className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  >

                    {/* Company */}
                    <td className="py-5">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            domain
                              ? `https://www.google.com/s2/favicons?sz=128&domain=${domain}`
                              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt={item.company}
                          className="w-10 h-10 rounded-full border bg-white object-contain"
                          onError={(e) => {
                            e.target.src =
                              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                          }}
                        />

                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {item.company}
                        </span>

                      </div>

                    </td>

                    {/* Role */}
                    <td className="text-gray-600 dark:text-gray-300">
                      {item.role}
                    </td>

                    {/* Status */}
                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                );
              })

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-500"
                >
                  No applications found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

