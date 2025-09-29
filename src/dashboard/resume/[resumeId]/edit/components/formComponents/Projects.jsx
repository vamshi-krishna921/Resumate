import React, { useState } from "react";

const formFields = [
  {
    title: "",
    description: "",
    startDate: " ",
    endDate: "",
  },
];

function Projects() {
  const [projectsList, setProjectsList] = useState([formFields]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Projects</h2>
      <p className="text-sm text-gray-600 mb-3">
        Add your awesome projects below.
      </p>
      <div>
        {projectsList.map((project, index) => (
         <div key={index}>
          <div className="grid grid-cols-2">
            <div>
              <label htmlFor="title">Position Title</label>
              <Input name="title" onChange={(event) => handleChange(index,event)}/>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
