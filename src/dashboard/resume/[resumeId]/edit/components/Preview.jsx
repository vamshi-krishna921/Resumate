import { ResumeContext } from "@/contextApi/ResumeContext";
import React, { useContext } from "react";
import PersonalDetails from "./previewComponents/PersonalDetails";
import Summary from "./previewComponents/Summary";
import Experience from "./previewComponents/Experience";
import Education from "./previewComponents/Education";
import Projects from "./previewComponents/Projects";
import Skills from "./previewComponents/Skills";
import Achievements from "./previewComponents/Achievements";

function Preview({ templateId }) {
  const { resumeContent } = useContext(ResumeContext);

  return (
    <div className="p-4 md:p-10 h-full rounded shadow-lg bg-white print:bg-white print:p-9">
      {/* Personal details */}
      <div className="mb-4">
        <PersonalDetails resumeContent={resumeContent} />
      </div>

      {/* Summary */}
      <div className="mb-4">
        <Summary resumeContent={resumeContent} />
      </div>

      {/* Experience for professional / Education for fresher */}
      <div className="mb-4">
        {templateId === 2 ? (
          <Experience resumeContent={resumeContent} templateId={templateId} />
        ) : (
          <Education resumeContent={resumeContent} templateId={templateId} />
        )}
      </div>

      {/* Education for professional / Projects for fresher */}
      <div className="mb-4">
        {templateId === 2 ? (
          <Education resumeContent={resumeContent} templateId={templateId} />
        ) : (
          <Projects resumeContent={resumeContent} templateId={templateId} />
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <Skills resumeContent={resumeContent} />
      </div>

      {/* Achievements */}
      <div className="mb-4">
        <Achievements resumeContent={resumeContent} />
      </div>
    </div>
  );
}

export default Preview;
