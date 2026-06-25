import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";

import AnalyticsChart from "../components/AnalyticsChart";
import SuccessChart from "../components/SuccessChart";
import MonthlyGrowthChart from "../components/MonthlyGrowthChart";
import TopCompaniesChart from "../components/TopCompaniesChart";
import ExportPDFButton from "../components/ExportPDFButton";

export default function Statistics() {
  const [applications, setApplications] = useState([]);

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

  const totalCount = applications.length;

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const successRate =
    totalCount > 0
      ? ((selectedCount / totalCount) * 100).toFixed(1)
      : 0;

  const rejectedRate =
    totalCount > 0
      ? ((rejectedCount / totalCount) * 100).toFixed(1)
      : 0;

  const interviewRate =
    totalCount > 0
      ? ((interviewCount / totalCount) * 100).toFixed(1)
      : 0;

  return (
    <div className="p-8 bg-white dark:bg-slate-950 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Statistics
      </h1>
      <ExportPDFButton
        applications={applications}
      />

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
          <h2 className="text-gray-500 dark:text-gray-400">
            Total Applications
          </h2>

          <p className="text-3xl font-bold mt-3 text-blue-600">
            {totalCount}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
          <h2 className="text-gray-500 dark:text-gray-400">
            Success Rate
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            {successRate}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
          <h2 className="text-gray-500 dark:text-gray-400">
            Rejected Rate
          </h2>

          <p className="text-3xl font-bold text-red-600 mt-3">
            {rejectedRate}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
          <h2 className="text-gray-500 dark:text-gray-400">
            Interview Rate
          </h2>

          <p className="text-3xl font-bold text-yellow-500 mt-3">
            {interviewRate}%
          </p>
        </div>

      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        <AnalyticsChart
          appliedCount={appliedCount}
          interviewCount={interviewCount}
          selectedCount={selectedCount}
          rejectedCount={rejectedCount}
        />

        <SuccessChart
          selectedCount={selectedCount}
          rejectedCount={rejectedCount}
        />

      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">

        <MonthlyGrowthChart
          applications={applications}
        />

        <TopCompaniesChart
          applications={applications}
        />

      </div>

    </div>
  );
}