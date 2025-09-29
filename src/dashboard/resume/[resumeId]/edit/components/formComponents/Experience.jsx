import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "@/contextApi/ResumeContext";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience({ setIsNextEnabled }) {
  const [experienceList, setExperienceList] = useState([{ ...formFields }]);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //* Generate AI summary
  const generateWorkSummary = async (index) => {
    setLoadingIndex(index);
    try {
      const experience = experienceList[index];
      const prompt = `Position: ${experience.title}. Company: ${experience.companyName}. Write a concise professional work summary in 5-7 lines. Focus on key achievements, skills demonstrated, and contributions. Provide a single paragraph.`;

      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/generate-summary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      if (data.text) {
        const updatedList = [...experienceList];
        updatedList[index].workSummery = data.text.trim();
        setExperienceList(updatedList);
        toast("Work summary generated! ✅");
      }
    } catch (err) {
      console.error("AI generation failed:", err);
      toast("Failed to generate work summary ❌");
    } finally {
      setLoadingIndex(null);
    }
  };

  //* Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
  };

  //* Add / Remove experience
  const addMoreExperience = () =>
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  const removeExperience = () => {
    if (experienceList.length > 1)
      setExperienceList((prev) => prev.slice(0, -1));
  };

  //* Enable next button if at least one experience has data
  useEffect(() => {
    setResumeContent({ ...resumeContent, experience: experienceList });
    const hasData = experienceList.some((exp) =>
      Object.values(exp).some((val) => val !== "")
    );
    setIsNextEnabled(hasData);
  }, [experienceList, setIsNextEnabled]);

  //* Handle form submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        data: {
          Experience: experienceList.map((exp) => ({
            title: exp.title || "",
            companyName: exp.companyName || "",
            city: exp.city || "",
            state: exp.state || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            workSummery: exp.workSummery || "",
          })),
        },
      };

      await updateResume(params?.resumeId, data);
      toast("Data saved successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Failed to save data ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Experience</h2>
      <p className="text-sm text-gray-600 mb-3">
        Add your professional experience
      </p>

      <form onSubmit={handleSubmit}>
        {experienceList.map((experience, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div className="mt-3">
              <label>Position Title</label>
              <Input
                name="title"
                value={experience.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mt-3">
              <label>Company Name</label>
              <Input
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mt-3">
              <label>City</label>
              <Input
                name="city"
                value={experience.city}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mt-3">
              <label>State</label>
              <Input
                name="state"
                value={experience.state}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mt-3">
              <label>Start Date</label>
              <Input
                name="startDate"
                value={experience.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="mt-3">
              <label>End Date</label>
              <Input
                name="endDate"
                placeholder="currently working add present"
                value={experience.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            {/* Work Summary */}
            <div className="col-span-2 mt-3 flex flex-col gap-2">
              <label>Work Summary</label>
              <div className="flex gap-2">
                <Textarea
                  name="workSummery"
                  value={experience.workSummery}
                  onChange={(e) => handleChange(index, e)}
                />
                <Button
                  size="sm"
                  type="button"
                  onClick={() => generateWorkSummary(index)}
                  disabled={loadingIndex === index}
                >
                  {loadingIndex === index ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <Brain />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button type="button" onClick={addMoreExperience}>
              + Add More Experience
            </Button>
            <Button type="button" onClick={removeExperience}>
              - Remove Experience
            </Button>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Experience;
