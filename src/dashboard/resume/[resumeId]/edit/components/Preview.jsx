import { ResumeContext } from "@/contextApi/ResumeContext";
import React, { useContext } from "react";
import PersonalDetails from "./previewComponents/PersonalDetails";

function Preview({ templateId }) {
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  console.log("Template ID in Preview:", templateId);

  return (
    <div>
      {/* Personal details */}
      <PersonalDetails resumeContent={resumeContent} />
      {/* Summary */}

      {/* Experience for professional (templateId : 2) / Education fro fresher*/}

      {/* Education for professional / projects for fresher*/}

      {/* Skills */}
      <h1>Preview</h1>
    </div>
  );
}

export default Preview;
