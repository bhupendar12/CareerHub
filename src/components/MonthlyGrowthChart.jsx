import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function MonthlyGrowthChart({
  applications,
}) {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const counts = Array(12).fill(0);

  applications.forEach((app) => {

    const month =
      new Date(
        app.createdAt
      ).getMonth();

    counts[month]++;

  });

  const data = {

    labels: months,

    datasets: [
      {
        label: "Applications",

        data: counts,

        borderColor: "#8B5CF6",

        backgroundColor: "#8B5CF6",

        tension: 0.4,

        fill: false,
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

    <div className="
      bg-white
      dark:bg-slate-800
      border
      border-gray-200
      dark:border-slate-700
      rounded-3xl
      shadow-sm
      p-6
    ">

      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Monthly Growth
      </h2>

      <Line
        data={data}
        options={options}
      />

    </div>

  );
}