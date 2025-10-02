import React from "react";

function Projects({ resumeContent, templateId }) {
  return (
    <div className="my-4 font-resume">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-xs md:text-sm print:text-sm">Projects</h1>
      </div>
      {resumeContent?.projects.map((project, index) => (
        <div key={index} className="mb-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xs md:text-sm print:text-sm">
              {project?.title}
            </h2>
            <span className="italic text-[10px] md:text-xs print:text-xs">
              ({project?.startDate} -{" "}
              {project?.endDate ? project?.endDate : "Present"})
            </span>
          </div>
          <p className="text-[10px] md:text-xs print:text-xs my-2">
            {project?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Projects;
