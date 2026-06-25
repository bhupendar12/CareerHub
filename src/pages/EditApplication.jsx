import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getApplicationById,
  updateApplication,
} from "../services/applicationService";

export default function EditApplication() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      company: "",
      role: "",
      status: "Applied",
      interviewDate: "",
      hrContact: "",
      salary: "",
      location: "",
      notes: "",
    });

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication =
    async () => {

      try {

        const data =
          await getApplicationById(
            id
          );

        setFormData({
          company:
            data.company,
          role:
            data.role,
          status:
            data.status,
          interviewDate:
            data.interviewDate || "",
          hrContact:
            data.hrContact || "",
          salary:
            data.salary || "",
          location:
            data.location || "",
          notes:
            data.notes || "",
        });

      } catch (error) {

        console.log(error);

      }
    };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateApplication(
          id,
          formData
        );

        alert(
          "Application Updated Successfully"
        );

        navigate(
          "/applications"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update application"
        );

      }
    };

  return (
    <div className="p-8">

      <div className="bg-white p-8 rounded-xl shadow max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Edit Application
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="company"
            value={
              formData.company
            }
            onChange={
              handleChange
            }
            placeholder="Company Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="role"
            value={
              formData.role
            }
            onChange={
              handleChange
            }
            placeholder="Job Role"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="date"
            name="interviewDate"
            value={
              formData.interviewDate
                ? formData.interviewDate.slice(
                    0,
                    10
                  )
                : ""
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="hrContact"
            value={
              formData.hrContact
            }
            onChange={
              handleChange
            }
            placeholder="HR Contact"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="salary"
            value={
              formData.salary
            }
            onChange={
              handleChange
            }
            placeholder="Salary (e.g. 12 LPA)"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            placeholder="Location"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            placeholder="Notes"
            rows="4"
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          >

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-lg w-full"
          >
            Update Application
          </button>

        </form>

      </div>

    </div>
  );
}