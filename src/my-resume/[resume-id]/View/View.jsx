import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeContext } from "@/contextApi/ResumeContext";
import Preview from "@/dashboard/resume/[resumeId]/edit/components/Preview";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { getResumeById } from "./../../../../service/GlobalAPIs";
import dummydata from "@/dummydata/dummydata";

function View() {
  const { resumeId } = useParams();

  const [resumeContent, setResumeContent] = useState();
  const [templateId, setTemplateId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch resume by ID
  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      try {
        const res = await getResumeById(resumeId);
        if (res.data?.data) {
          const record = res.data.data;
          console.log("Fetched resume:", record);
          setTemplateId(record.templateId || null);
          setResumeContent(record);
        } else {
          console.warn("No resume found with this documentId:", resumeId);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading your resume...</p>
      </div>
    );
  }

  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeContext.Provider value={{ resumeContent, setResumeContent }}>
      <div id="dontPrint">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h1 className="text-2xl text-center font-bold">
            You did it! Your career journey starts here.
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Your resume is ready to download, share, or review. Showcase your
            achievements to the world!
          </p>

          <div className="flex items-center justify-center md:justify-between gap-4 my-8">
            <Button>Share</Button>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36" id="print">
        <Preview templateId={templateId} />
      </div>
    </ResumeContext.Provider>
  );
}

export default View;
