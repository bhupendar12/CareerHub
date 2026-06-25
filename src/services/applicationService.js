import axios from "axios";

const API_URL =
  "https://careerhub-l3jk.onrender.com/api/applications";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all applications
export const getApplications =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };

// Get single application by id
export const getApplicationById =
  async (id) => {

    const response =
      await axios.get(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };

// Create application
export const createApplication =
  async (applicationData) => {

    const response =
      await axios.post(
        API_URL,
        applicationData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };

// Update application
export const updateApplication =
  async (
    id,
    applicationData
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        applicationData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };

// Delete application
export const deleteApplication =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };

  export const getApplicationStats =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };
