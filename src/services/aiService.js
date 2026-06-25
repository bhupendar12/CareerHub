import axios from "axios";

const API_URL = "https://careerhub-l3jk.onrender.com";

export const analyzeResume = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/resume-review`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
