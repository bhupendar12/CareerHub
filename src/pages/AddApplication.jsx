import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/applicationService";

export default function AddApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    interviewDate: "",
    hrContact: "",
    salary: "",
    location: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createApplication(formData);

      alert("Application Added Successfully");

      navigate("/applications");
    } catch (error) {
      console.error(error);
      alert("Failed to add application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-slate-950 transition-all">

      <div className="
        max-w-2xl
        mx-auto
        bg-white
        dark:bg-slate-800
        border
        border-gray-200
        dark:border-slate-700
        rounded-3xl
        shadow-lg
        p-8
      ">

        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Add Application
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* Role */}
          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* Interview Date */}
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* HR Contact */}
          <input
            type="text"
            name="hrContact"
            placeholder="HR Contact"
            value={formData.hrContact}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* Salary */}
          <input
            type="text"
            name="salary"
            placeholder="Salary (e.g. 12 LPA)"
            value={formData.salary}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-gray-800
              dark:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-fuchsia-500
              text-white
              font-semibold
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            {loading ? "Saving..." : "Save Application"}
          </button>

        </form>

      </div>

    </div>
  );
}