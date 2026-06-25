import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ApplicationTable from "../components/ApplicationTable";
import StatusChart from "../components/StatusChart";
import InterviewCard from "../components/InterviewCard";
import ApplicationTrend from "../components/ApplicationTrend";

import { getApplications } from "../services/applicationService";

import {
  Briefcase,
  FileText,
  Clock3,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const data =
        await getApplications();

      setApplications(data);

    } catch (error) {

      console.log(error);

    }
  };

  // Dynamic Counts

  const totalCount =
    applications.length;

  const appliedCount =
    applications.filter(
      (app) =>
        app.status === "Applied"
    ).length;

  const interviewCount =
    applications.filter(
      (app) =>
        app.status === "Interview"
    ).length;

  const selectedCount =
    applications.filter(
      (app) =>
        app.status === "Selected"
    ).length;

  const rejectedCount =
    applications.filter(
      (app) =>
        app.status === "Rejected"
    ).length; 
  
  const successRate =
    totalCount > 0
     ? ((selectedCount / totalCount) * 100).toFixed(1)
     : 0;

  const rejectedRate =
    totalCount > 0
     ? ((rejectedCount / totalCount) * 100).toFixed(1)
     : 0;

  const interviewConversion =
    totalCount > 0
     ? ((interviewCount / totalCount) * 100).toFixed(1)
     : 0;

  // Current Month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthApplications =
    applications.filter((app) => {
      const date = new Date(app.createdAt);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }).length;

  // Previous Month
  const previousMonthApplications =
    applications.filter((app) => {
      const date = new Date(app.createdAt);

      return (
        date.getMonth() === currentMonth - 1 &&
        date.getFullYear() === currentYear
      );
    }).length;

  // Monthly Growth %
  const monthlyGrowth =
    previousMonthApplications > 0
      ? (
          (
            (currentMonthApplications -
              previousMonthApplications) /
            previousMonthApplications
          ) * 100
        ).toFixed(1)
      : 100;


  // Top Companies

  const companyCounts = {};

  applications.forEach((app) => {
    companyCounts[app.company] =
      (companyCounts[app.company] || 0) + 1;
  });

  const topCompanies =
    Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

  return (

    <div className="flex min-h-screen bg-[#f5f7fb] text-gray-900 dark:bg-slate-950 dark:text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-52 px-6 py-5">

        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <StatsCard
            title="Total Applications"
            value={totalCount}
            color="text-blue-600"
            icon={
              <Briefcase
                size={28}
                className="text-purple-600"
              />
            }
          />

          <StatsCard
            title="Applied"
            value={appliedCount}
            color="text-yellow-500"
            icon={
              <FileText
                size={28}
                className="text-purple-600"
              />
            }
          />

          <StatsCard
            title="Interview"
            value={interviewCount}
            color="text-purple-600"
            icon={
              <Clock3
                size={28}
                className="text-purple-600"
              />
            }
          />

          <StatsCard
            title="Selected"
            value={selectedCount}
            color="text-green-600"
            icon={
              <CheckCircle
                size={28}
                className="text-purple-600"
              />
            }
          />

          <StatsCard
            title="Success Rate"
            value={`${successRate}%`}
            color="text-green-600"
          />

          <StatsCard
            title="Rejected Rate"
            value={`${rejectedRate}%`}
            color="text-red-600"
          />

          <StatsCard
            title="Interview Conversion"
            value={`${interviewConversion}%`}
            color="text-purple-600"
          />

          <StatsCard
            title="Rejected"
            value={rejectedCount}
            color="text-red-500"
          />

          
          <StatsCard
            title="Monthly Growth"
            value={`${monthlyGrowth}%`}
            color="text-blue-600"
          />
        
        </div>

        {/* Middle Section */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            <ApplicationTable
              applications={applications
                .slice()
                .reverse()
                .slice(0,5)

              }
              searchTerm={searchTerm}
            />

            <ApplicationTrend
              applications={applications}
            />

          </div>

          {/* Right Side */}
          <div className="space-y-6">

            <StatusChart
              appliedCount={appliedCount}
              interviewCount={interviewCount}
              selectedCount={selectedCount}
              rejectedCount={rejectedCount}
            />

            <InterviewCard
              applications={applications}
             />

          </div>

          
          {/* Top Companies */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
              Top Companies Applied To
          </h2>

          <div className="space-y-4">
            {topCompanies.map(([company, count]) => (
              
              <div
              key={company}
              className="flex justify-between items-center border-b pb-3"
              >

            <span className="font-medium text-gray-700">
              {company}
            </span>

            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              {count}
            </span>

          </div>

        ))}

      </div>

    </div>
    </div>
    </div>
    </div>

  );
}