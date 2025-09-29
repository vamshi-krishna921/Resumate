import React from "react";

function Achievements({ resumeContent }) {
  return (
    <div className="my-4 font-resume">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-sm">Achievements</h1>
      </div>

      <div className="space-y-1">
        {resumeContent?.achievements?.map((achievement, index) => (
          <p key={index} className="text-xs">
            <span className="font-bold">{achievement.title}</span> -
            <span className="font-light">{achievement.description}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
