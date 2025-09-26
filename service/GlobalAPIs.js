import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const createResume = (data) => axiosInstance.post("/user-resumes", {data});
export const getResumes = () => axiosInstance.get("/user-resumes");
export default axiosInstance;
