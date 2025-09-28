import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

//* Create a new resume
export const createResume = (data) => axiosInstance.post("/resumes", { data });

//* Get resumes by user email
export const getResumes = (userEmail) =>
  axiosInstance.get(`/resumes?filters[userEmail][$eq]=${userEmail}`);

//* Get resume by ID
export const getResumeById = (resumeId) =>
  axiosInstance.get(`/resumes?filters[resumeId][$eq]=${resumeId}`);

// //* Update a resume
export const updateResume = (id, data) =>
  axiosInstance.put(`/resumes/` + id, data);

export default axiosInstance;
