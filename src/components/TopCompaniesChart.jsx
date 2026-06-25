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

export default function TopCompaniesChart({
  applications,
}) {
  const companies = {};

  applications.forEach((app) => {
    companies[app.company] =
      (companies[app.company] || 0) + 1;
  });

  const labels = Object.keys(companies);

  const values = Object.values(companies);

  const data = {
    labels,

    datasets: [
      {
        label: "Applications",
        data: values,
        backgroundColor: "#8B5CF6",
        borderRadius: 8,
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
        Top Companies
      </h2>

      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}