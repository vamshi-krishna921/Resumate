import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./components/Form";
import Preview from "./components/Preview";
import { ResumeContext } from "@/contextApi/ResumeContext";
import dummydata from "@/dummydata/dummydata";
import { getResumeById } from "../../../../../service/GlobalAPIs";

function Edit() {
  const { resumeId } = useParams();
  const [resumeContent, setResumeContent] = useState(dummydata);
  const [templateId, setTemplateId] = useState(null);

  // Fetch resume by ID if it exists
  useEffect(() => {
    if (resumeId) {
      getResumeById(resumeId)
        .then((res) => {
          if (res.data?.data) {
            const record = res.data.data;
            console.log("Fetched resume:", record);
            setTemplateId(record.templateId || null);
            // Merge fetched data with dummydata to avoid undefined fields
            setResumeContent({ ...dummydata, ...record });
          } else {
            console.warn("No resume found with this documentId:", resumeId);
          }
        })
        .catch((err) => console.error("Error fetching resume:", err));
    }
  }, [resumeId]);

  return (
    <ResumeContext.Provider value={{ resumeContent, setResumeContent }}>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 p-12 gap-12">
        {/* Form component */}
        <Form templateId={templateId} />
        {/* Preview component */}
        <Preview templateId={templateId} />
      </div>
    </ResumeContext.Provider>
  );
}

export default Edit;
