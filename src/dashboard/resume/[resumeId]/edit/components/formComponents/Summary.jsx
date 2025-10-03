import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeContext } from "@/contextApi/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
          },
          body: JSON.stringify({ prompt: PROMPT }),
        }
      );

      const data = await res.json();
      const generatedSummary = data.text || "";

      setSummary(generatedSummary);
      setResumeContent({ ...resumeContent, summary: generatedSummary });
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resumeContent?.summary) {
      setSummary(resumeContent.summary);
    }
  }, [resumeContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { data: { summary: summary } };
    setLoading(true);
    updateResume(params?.resumeId, data)
      .then((res) => {
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

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <label htmlFor="summary" className="text-sm font-bold">
            Add Summary
          </label>
          <Button
            size="sm"
            type="button"
            onClick={generateSummarayUsingAi}
            className="whitespace-nowrap bg-gradient-to-br from-[#00203F] via-[#3B2F72] to-[#7C3AED] font-body cursor-pointer hover:scale-107 active:scale-95 transition-all text-white font-[400px]"
          >
            <Brain className="mr-1" />
            Generating using AI
          </Button>
        </div>

        <Textarea
          className="mt-2"
          value={summary || ""}
          onChange={(e) => {
            setSummary(e.target.value);
            setResumeContent({ ...resumeContent, summary: e.target.value });
          }}
          required
        />

        <div className="flex justify-end mt-3">
          <Button disabled={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Summary;
