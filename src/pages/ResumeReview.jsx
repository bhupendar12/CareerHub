import { useState } from "react";
import { analyzeResume } from "../services/aiService";

export default function ResumeReview() {

  const [resumeFile, setResumeText] = useState(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {

    if (!resumeFile) {
      alert("Please paste your resume first");
      return;
    }

    try {

      setLoading(true);

      const data =
        await analyzeResume(resumeText);

      setReview(
        data.review ||
        "No response received"
      );

    } catch (error) {

      console.log(error);

      setReview(
        "Failed to analyze resume."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-8">

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Resume Review AI
        </h1>

        <textarea
          rows="12"
          value={resumeText}
          onChange={(e) =>
            setResumeText(e.target.value)
          }
          placeholder="Paste your resume here..."
          className="
          w-full
          border
          border-gray-300
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          p-4
          rounded-2xl
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
          "
        />

        <button
          onClick={handleReview}
          disabled={loading}
          className="
          mt-6
          bg-purple-600
          hover:bg-purple-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          transition
          disabled:opacity-50
          "
        >
          {loading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

        {review && (

          <div
            className="
            mt-8
            bg-gray-100
            dark:bg-slate-900
            dark:text-white
            p-6
            rounded-2xl
            whitespace-pre-wrap
            border
            border-gray-200
            dark:border-slate-700
            "
          >

            <h2 className="text-xl font-bold mb-4">
              AI Resume Review
            </h2>

            {review}

          </div>

        )}

      </div>

    </div>

  );

}

