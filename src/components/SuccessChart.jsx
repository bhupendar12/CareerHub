import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function SuccessChart({
  selectedCount,
  rejectedCount,
}) {

  const data = {

    labels: [
      "Success",
      "Rejected",
    ],

    datasets: [
      {
        data: [
          selectedCount,
          rejectedCount,
        ],

        backgroundColor: [
          "#10B981",
          "#EF4444",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {

        position: "bottom",

        labels: {
          color: "#ffffff",
        },

      },

    },

    cutout: "70%",

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
        Success vs Rejected
      </h2>

      <Doughnut
        data={data}
        options={options}
      />

    </div>

  );
}