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
  const [templateId, setTemplateId] = useState();
  useEffect(() => {
    setResumeContent(dummydata);
  },[]);
  useEffect(() => {
    if (resumeId) {
      getResumeById(resumeId)
        .then((res) => {
          if (res.data.data.length > 0) {
            setTemplateId(res.data.data[0].templateId);
          }
        })
        .catch((err) => console.error("Error fetching templateId:", err));
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
