import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeContext } from "@/contextApi/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function Summary({ setIsNextEnabled }) {
  const params = useParams();
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const prompt = `Job title: {jobTitle}. Give me one professional recruiting summary for this role without any experience, in 4-5 lines. Only provide a single summary.`;

  //* Calling Gen AI for summary
  const generateSummarayUsingAi = async () => {
    setLoading(true);
    try {
      const PROMPT = prompt.replace(
        "{jobTitle}",
        resumeContent?.jobTitle || ""
      );

      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/generate-summary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: PROMPT }),
        }
      );

      const data = await res.json();
      setSummary(data.text || "");
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  //* UseEffect
  useEffect(() => {
    summary && setResumeContent({ ...resumeContent, summary: summary });
  }, [summary]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      data: { summary: summary },
    };
    setLoading(true);
    updateResume(params?.resumeId, data)
      .then((res) => {
        console.log(res);
        setIsNextEnabled(true);
        setLoading(false);
        toast("Data has been added. ✅");
      })
      .catch((err) => {
        toast("Failed to add the data. Please edit something. ❌");
        setLoading(false);
      });
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Summary</h2>
      <p className="text-sm text-gray-600 mb-3">Add summary for your job</p>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="flex items-end justify-between">
          <label htmlFor="summary" className="text-sm font-bold">
            Add Summary
          </label>
          <Button
            size="sm"
            type="button"
            onClick={() => generateSummarayUsingAi()}
          >
            {" "}
            <Brain />
            Generating using AI
          </Button>
        </div>
        <Textarea
          className="mt-4"
          value={summary || ""} 
          onChange={(e) => setSummary(e.target.value)}
          required
        />

        <div className="col-span-2 flex justify-end mt-3">
          <Button disable={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Summary;
