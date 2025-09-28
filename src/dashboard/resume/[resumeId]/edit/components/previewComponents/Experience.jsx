import React from "react";

function Experience({ resumeContent, templateId }) {
  return (
    <div className="my-4 font-resume">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-sm">Professional Experience</h1>
      </div>
      {resumeContent?.experience.map((experience, index) => (
        <div key={index} className="mb-2">
          <h2 className="font-semibold text-sm">{experience?.title}</h2>
          <h3 className="italic text-xs flex items-center justify-between">
            {experience?.companyName} , {experience?.city} {experience?.state}
            <span className="text-gray-700">
              ({experience?.startDate} -{" "}
              {experience?.endDate ? experience?.endDate : "Present"})
            </span>
          </h3>
          <p className="text-xs my-2">{experience?.workSummery}</p>
        </div>
      ))}
    </div>
  );
}

export default Experience;
