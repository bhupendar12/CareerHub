import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { analyzeResume } from "../services/aiService";

export default function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  const { language, changeLanguage } = useLanguage();

  const [resumeFile, setResumeFile] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReview() {
    if (!resumeFile) {
      alert("Please upload a PDF resume");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeResume(resumeFile);
      setReview(data.review || "No response received");
    
    } catch (error) {
      console.log(error);
      
      setReview("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Settings
        </h1>

        {/* Appearance */}
        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Appearance
          </h2>

          <div className="bg-gray-100 dark:bg-slate-900 p-5 rounded-2xl flex items-center justify-between">

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Dark Mode
              </h3>

              <p className="text-gray-500 text-sm">
                Enable or disable dark theme
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-5 py-2 rounded-xl text-white ${
                darkMode
                  ? "bg-green-600"
                  : "bg-purple-600"
              }`}
            >
              {darkMode ? "ON" : "OFF"}
            </button>

          </div>

        </div>

        {/* Language */}
        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Language
          </h2>

          <div className="bg-gray-100 dark:bg-slate-900 p-5 rounded-2xl">

            <select
              value={language}
              onChange={(e) =>
                changeLanguage(e.target.value)
              }
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="English">
                English
              </option>

              <option value="Hindi">
                Hindi
              </option>

              <option value="Hinglish">
                Hinglish
              </option>

            </select>

          </div>

        </div>

        {/* Resume Review AI */}
        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            🤖 Resume Review AI
          </h2>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl">

            <input
              type="file"
              accept=".pdf" 
              onChange={(e) => 
                setResumeFile(e.target.files[0]) 
              }
              className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              "
            />

            <button
              onClick={handleReview}
              className="
              mt-6
              bg-purple-600
              hover:bg-purple-700
              text-white
              px-6
              py-3
              rounded-xl
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
                bg-white
                dark:bg-slate-800
                border
                border-gray-200
                dark:border-slate-700
                p-6
                rounded-2xl
                whitespace-pre-wrap
                text-gray-900
                dark:text-white
                "
              >
                {review}
              </div>

            )}

          </div>

        </div>

        {/* Upcoming Features */}

        <div>

          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Upcoming Features
          </h2>

          <div className="space-y-4">

            <div className="bg-purple-100 dark:bg-purple-900 p-5 rounded-2xl text-gray-900 dark:text-white">
              📄 Export PDF Report
            </div>

            <div className="bg-green-100 dark:bg-green-900 p-5 rounded-2xl text-gray-900 dark:text-white">
              🎯 Interview Question Generator
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900 p-5 rounded-2xl text-gray-900 dark:text-white">
              📈 ATS Score Checker
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}