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

export default function ApplicationTrend({
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

  const monthlyData = Array(12).fill(0);

  applications.forEach((app) => {

    const month =
      new Date(
        app.createdAt
      ).getMonth();

    monthlyData[month]++;

  });

  const data = {

    labels: months,

    datasets: [
      {
        label: "Applications",

        data: monthlyData,

        borderColor: "#8B5CF6",

        backgroundColor: "#8B5CF6",

        pointBackgroundColor: "#8B5CF6",

        pointRadius: 5,

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

          color: "#94A3B8",

        },

      },

    },

    scales: {

      x: {

        ticks: {

          color: "#94A3B8",

        },

        grid: {

          color: "rgba(148,163,184,0.15)",

        },

      },

      y: {

        beginAtZero: true,

        ticks: {

          color: "#94A3B8",

        },

        grid: {

          color: "rgba(148,163,184,0.15)",

        },

      },

    },

  };

  return (

    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold mb-6 text-black dark:text-white">

        Applications Over Time

      </h2>

      <Line
        data={data}
        options={options}
      />

    </div>

  );

}

