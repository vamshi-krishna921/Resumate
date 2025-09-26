import React from "react";
import YourResumes from "./components/CreateResumes";

function Dashboard() {
  return (
    <div className="p-8 md:px-16 lg:px-32 font-body">
      <h1 className="font-heading text-3xl font-extrabold text-clip">
        My Resume
      </h1>

      <p className="mt-1 text-gray-600 text-xl">
        Build a job-ready resume that stands out using AI.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-4 gap-5 md:gap-6 lg:gap-9 md:mt-6">
        <YourResumes />
      </div>
    </div>
  );
}

export default Dashboard;
