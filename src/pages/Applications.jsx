import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchFilter from "../components/SearchFilter";

import {
getApplications,
deleteApplication,
} from "../services/applicationService";

export default function Applications() {
const [applications, setApplications] = useState([]);
const [search, setSearch] = useState("");
const [status, setStatus] = useState("");

useEffect(() => {
fetchApplications();
}, []);

const fetchApplications = async () => {
try {
const data = await getApplications();
setApplications(data);
} catch (error) {
console.error(error);
}
};

const handleDelete = async (id) => {
if (!window.confirm("Delete this application?")) return;


try {
  await deleteApplication(id);

  setApplications(
    applications.filter(
      (app) => app._id !== id
    )
  );
} catch (error) {
  console.error(error);
}


};

const filtered = applications.filter((app) => {
const companyMatch = app.company
.toLowerCase()
.includes(search.toLowerCase());


const statusMatch =
  status === ""
    ? true
    : app.status === status;

return companyMatch && statusMatch;


});

return ( <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-black dark:text-white p-8">

```
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">
      Applications
    </h1>

    <Link
      to="/add-application"
      className="bg-purple-600 text-white px-5 py-3 rounded-lg"
    >
      Add Application
    </Link>
  </div>

  <SearchFilter
    search={search}
    setSearch={setSearch}
    status={status}
    setStatus={setStatus}
  />

  <div className="bg-white rounded-xl shadow overflow-x-auto">

    <table className="min-w-[1200px] w-full">

      <thead>
        <tr className="border-b bg-gray-50">

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Company
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Role
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Status
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            HR Contact
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Salary
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Location
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Notes
          </th>

          <th className="p-4 text-left text-gray-700 dark:text-gray-300">
            Actions
          </th>

        </tr>
      </thead>

      <tbody>

        {filtered.length > 0 ? (
          filtered.map((app) => (
            <tr
              key={app._id}
              className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
            >

              <td className="p-4 text-gray-700 dark:text-gray-200">
                {app.company}
              </td>

              <td>
                {app.role}
              </td>

              <td>
                {app.status}
              </td>

              <td>
                {app.hrContact || "-"}
              </td>

              <td>
                {app.salary || "-"}
              </td>

              <td>
                {app.location || "-"}
              </td>

              <td>
                {app.notes || "-"}
              </td>

              <td>

                <Link
                  to={`/edit-application/${app._id}`}
                  className="text-blue-600 mr-4"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(app._id)
                  }
                  className="text-red-600"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))
        ) : (
          <tr>

            <td
              colSpan="8"
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
