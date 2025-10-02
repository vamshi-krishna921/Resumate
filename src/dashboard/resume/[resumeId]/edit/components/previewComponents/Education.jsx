import React from "react";

function Education({ resumeContent, templateId }) {
  return (
    <div className="my-4 font-resume">
      {/* Section Title */}
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-xs md:text-sm print:text-sm">
          Education
        </h1>
      </div>
      {resumeContent.education.map((education, index) => (
        <div key={index} className="mb-2">
          <h2 className="font-semibold text-xs md:text-sm print:text-sm">
            {education.universityName}
          </h2>
          <h2 className="italic text-[10px] md:text-xs print:text-xs flex items-center justify-between">
            {education.degree} in {education.major}
            <span>
              {education.startDate} - {education.endDate}
            </span>
          </h2>
          <h3 className="italic text-[10px] md:text-xs print:text-xs my-1">
            GPA : {education.cgpa}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Education;
