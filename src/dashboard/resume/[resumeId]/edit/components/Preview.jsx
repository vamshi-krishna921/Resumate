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
  const { resumeContent, setResumeContent } = useContext(ResumeContext);

  return (
    <div className="p-10 h-full rounded shadow-lg ">
      {/* Personal details */}
      <PersonalDetails resumeContent={resumeContent} />
      {/* Summary */}
      <Summary resumeContent={resumeContent} />
      {/* Experience for professional (templateId : 2) / Education fro fresher*/}
      {templateId === 2 ? (
        <Experience resumeContent={resumeContent} templateId={templateId} />
      ) : (
        <Education resumeContent={resumeContent} templateId={templateId} />
      )}
      {/* Education for professional / projects for fresher*/}
      {templateId === 2 ? (
        <Education resumeContent={resumeContent} templateId={templateId} />
      ) : (
        <Projects resumeContent={resumeContent} templateId={templateId} />
      )}
      {/* Skills */}
      <Skills resumeContent={resumeContent} />
      {/* Achievements */}
      <Achievements resumeContent={resumeContent} />
    </div>
  );
}

export default Preview;
