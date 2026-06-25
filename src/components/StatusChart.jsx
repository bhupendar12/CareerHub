import { Doughnut } from "react-chartjs-2";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
} from "chart.js";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

export default function StatusChart({
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
    data: [
      appliedCount,
      interviewCount,
      selectedCount,
      rejectedCount,
    ],

    backgroundColor: [
      "#FBBF24",
      "#8B5CF6",
      "#10B981",
      "#EF4444",
    ],

    borderWidth: 0,
  },
],


};

const options = {


plugins: {

  legend: {

    position: "bottom",

    labels: {
      color: "#94A3B8",
      font: {
        size: 13,
      },
    },

  },

},

cutout: "70%",


};

return (


<div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">

  <h2 className="text-xl font-bold mb-6 text-black dark:text-white">
    Application Status
  </h2>

  <Doughnut
    data={data}
    options={options}
  />

</div>


);

}
