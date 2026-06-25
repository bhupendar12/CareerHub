import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AnalyticsChart({
  appliedCount,
  interviewCount,
  selectedCount,
  rejectedCount,
}) {

  const data = {
    labels: [
      "Applied",
      "Interview",
      "Selected",
      "Rejected",
    ],

    datasets: [
      {
        label: "Applications",

        data: [
          appliedCount,
          interviewCount,
          selectedCount,
          rejectedCount,
        ],

        backgroundColor: [
          "#FACC15",
          "#8B5CF6",
          "#10B981",
          "#EF4444",
        ],

        borderRadius: 10,
      },
    ],
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {

        labels: {
          color: "#ffffff",
        },

      },

    },

    scales: {

      x: {

        ticks: {
          color: "#ffffff",
        },

        grid: {
          color: "#334155",
        },

      },

      y: {

        beginAtZero: true,

        ticks: {
          color: "#ffffff",
        },

        grid: {
          color: "#334155",
        },

      },

    },

  };

  return (

    <div
      className="
      bg-white
      dark:bg-slate-800
      border
      border-gray-200
      dark:border-slate-700
      rounded-3xl
      shadow-sm
      p-6
    "
    >

      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Applications Analytics
      </h2>

      <Bar
        data={data}
        options={options}
      />

    </div>

  );
}