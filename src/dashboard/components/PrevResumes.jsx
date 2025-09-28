import React from "react";
import resumeIcon from "../../assets/resumeIcon.png";
import { Link } from "react-router-dom";

function PrevResumes({ resume, index }) {
  return (
    <>
      <Link to={`/dashboard/resume/`+resume.documentId+"/edit"}>
        <div
          key={index}
          className="hover:scale-103 rounded-lg w-[288px] h-[400px] flex gap-3.5 flex-col items-center justify-start cursor-pointer transform-transition duration-200"
        >
          <div className="w-[98%] h-[90%] bg-color rounded-lg flex items-center justify-center">
            <img src={resumeIcon} alt="ResumeIcon" />
          </div>
          <h1 className="text-lg font-heading font-bold">{resume.title}</h1>
        </div>
      </Link>
    </>
  );
}

export default PrevResumes;
