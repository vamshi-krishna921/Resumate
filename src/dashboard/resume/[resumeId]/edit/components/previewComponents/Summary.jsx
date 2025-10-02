import React from "react";

function Summary({ resumeContent }) {
  return (
    <div className="font-resume my-4">
      <div className="px-1 bg-[#c6c6c6] mb-[4px]">
        <h1 className="font-bold text-sm print:text-sm">Summary</h1>
      </div>
      <p className="text-xs print:text-xs break-words whitespace-pre-wrap">
        {resumeContent?.summary}
      </p>
    </div>
  );
}

export default Summary;
