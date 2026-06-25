import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Download,
} from "lucide-react";

export default function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [profileImage, setProfileImage] =
    useState("");

  const [resumeName, setResumeName] =
    useState("");

  const [resumeUrl, setResumeUrl] =
    useState("");

  useEffect(() => {

    const savedUser =
      JSON.parse(localStorage.getItem("user")) || {};

    const savedImage =
      localStorage.getItem(
        `profileImage_${savedUser.email}`
      );

    const savedResumeName =
      localStorage.getItem(
        `resumeName_${savedUser.email}`
      );

    const savedResumeUrl =
      localStorage.getItem(
        `resumeUrl_${savedUser.email}`
      );

    setUser({
      name: savedUser.name || "",
      email: savedUser.email || "",
    });

    if (savedImage)
      setProfileImage(savedImage);

    if (savedResumeName)
      setResumeName(savedResumeName);

    if (savedResumeUrl)
      setResumeUrl(savedResumeUrl);

  }, []);

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setProfileImage(reader.result);

      localStorage.setItem(
        `profileImage_${user.email}`,
        reader.result
      );

    };

    reader.readAsDataURL(file);

  };

  const handleResumeUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setResumeName(file.name);

    const reader = new FileReader();

    reader.onload = () => {

      setResumeUrl(reader.result);

      localStorage.setItem(
        `resumeName_${user.email}`,
        file.name
      );

      localStorage.setItem(
        `resumeUrl_${user.email}`,
        reader.result
      );

    };

    reader.readAsDataURL(file);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const currentUser =
      JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...currentUser,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Saved Successfully");

  };

  return (

    <div className="p-8 min-h-screen bg-gray-100 dark:bg-slate-950">

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg overflow-hidden">

        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600"></div>

        <div className="px-8 pb-8">

          {/* Profile */}
          <div className="flex flex-col items-center -mt-16">

            <img
              src={
                profileImage ||
                "https://i.pravatar.cc/150"
              }
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <label className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700">

              Change Photo

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

            </label>

            <h2 className="text-3xl font-bold mt-4 text-gray-900 dark:text-white">
              {user.name || "Student Profile"}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {user.email}
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div>

              <label className="font-semibold block mb-2 text-gray-900 dark:text-white">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2 text-gray-900 dark:text-white">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />

            </div>

            {/* Resume */}
            <div>

              <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Resume
              </label>

              <label className="border-2 border-dashed border-purple-400 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-700 transition">

                <Upload
                  size={40}
                  className="text-purple-600 mb-3"
                />

                <p className="font-semibold text-gray-900 dark:text-white">
                  Upload Resume
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  PDF / DOC / DOCX
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeUpload}
                />

              </label>

              {resumeName && (

                <div className="mt-5 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex justify-between items-center">

                  <div className="flex items-center gap-3">

                    <FileText
                      size={24}
                      className="text-purple-600"
                    />

                    <span className="font-medium text-gray-900 dark:text-white">
                      {resumeName}
                    </span>

                  </div>

                  <a
                    href={resumeUrl}
                    download={resumeName}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >

                    <Download size={18} />

                    Download

                  </a>

                </div>

              )}

            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700"
            >
              Save Profile
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}