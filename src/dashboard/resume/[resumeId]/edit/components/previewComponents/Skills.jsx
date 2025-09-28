import React from "react";

function Skills({ resumeContent }) {
  return (
    <div className="my-4 font-resume">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-sm">Skills</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {resumeContent.skills.map((skill, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h2 className="font-semibold text-xs">{skill.name}</h2>
            <div className="h-2 w-[100px] bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-2 bg-zinc-500 rounded-full"
                style={{ width: `${skill.rating}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
