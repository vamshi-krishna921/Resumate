import React from "react";

function Summary({ resumeContent }) {
  return (
    <div className="font-resume my-4">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-sm">Summary</h1>
      </div>
      <p className="text-xs">{resumeContent?.summery}</p>
    </div>
  );
}

export default Summary;
