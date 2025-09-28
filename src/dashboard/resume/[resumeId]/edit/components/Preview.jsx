import { ResumeContext } from "@/contextApi/ResumeContext";
import React, { useContext } from "react";
import PersonalDetails from "./previewComponents/PersonalDetails";

function Preview({ templateId }) {
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  console.log("Template ID in Preview:", templateId);

  return (
    <div className="p-10 h-full rounded shadow-lg ">
      {/* Personal details */}
      <PersonalDetails resumeContent={resumeContent} />
      {/* Summary */}

      {/* Experience for professional (templateId : 2) / Education fro fresher*/}

      {/* Education for professional / projects for fresher*/}

      {/* Skills */}
    </div>
  );
}

export default Preview;
