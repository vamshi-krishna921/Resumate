import React from "react";
import CreateResumes from "./components/CreateResumes";
import { getResumes } from "../../service/GlobalAPIs";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import PrevResumes from "./components/PrevResumes";

function Dashboard() {
  const { user } = useUser();
  const [prevResumes, setprevResumes] = useState([]);

  //* Fetch prevResumes when the component mounts or user changes
  useEffect(() => {
    user && getprevResumesList();
  }, [user]);
  const getprevResumesList = () => {
    getResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setprevResumes(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching prevResumes: ", err);
      });
  };
  
  return (
    <div className="p-8 md:px-16 lg:px-32 font-body">
      <h1 className="font-heading text-3xl font-extrabold text-clip">
        My Resume
      </h1>

      <p className="mt-1 text-gray-600 text-xl">
        Build a job-ready resume that stands out using AI.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-4 gap-5 md:gap-6 lg:gap-9 md:mt-6">
        <CreateResumes />

        {/* Display previous resumes */}
        {prevResumes.length > 0 &&
          prevResumes.map((resume, index) => (
            <PrevResumes resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
