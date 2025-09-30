import React from "react";

function Experience({ resumeContent, templateId }) {
  return (
    <div className="my-4 font-resume">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-sm">Professional Experience</h1>
      </div>
      {resumeContent?.Experience.map((task, index) => (
        <div key={index} className="mb-2">
          <h2 className="font-semibold text-sm">{task?.title}</h2>
          <h3 className="italic text-xs flex items-center justify-between">
            {task?.companyName} , {task?.city} {task?.state}
            <span className="text-gray-700">
              ({task?.startDate} - {task?.endDate ? task?.endDate : "Present"})
            </span>
          </h3>
          <p className="text-xs my-2">{task?.workSummery}</p>
        </div>
      ))}
    </div>
  );
}

export default Experience;
