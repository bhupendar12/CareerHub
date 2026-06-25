export default function StatsCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div className="
      bg-white
      dark:bg-slate-800
      border
      border-gray-200
      dark:border-slate-700
      rounded-3xl
      p-6
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
    ">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-gray-500 dark:text-gray-400">
            {title}
          </h3>

          <h1 className={`text-4xl font-bold mt-3 ${color}`}>
            {value}
          </h1>

        </div>

        <div className="
         bg-slate-100
         dark:bg-slate-700/50
         p-4
         rounded-2xl
        ">
          {icon}
        </div>

      </div>

    </div>
  );
}

