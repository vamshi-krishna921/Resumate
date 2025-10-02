import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "@/contextApi/ResumeContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { LoaderCircle } from "lucide-react";

const formFields = {
  name: "",
  rating: "",
};

function Skills({ setIsNextEnabled }) {
  const [skillsList, setSkillsList] = useState(null);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (
      Array.isArray(resumeContent?.skills) &&
      resumeContent.skills.length > 0
    ) {
      setSkillsList(resumeContent.skills);
    } else {
      setSkillsList([{ ...formFields }]);
    }
  }, [resumeContent]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...skillsList];
    updatedList[index][name] = value;
    setSkillsList(updatedList);
  };

  const addMoreSkills = () => setSkillsList([...skillsList, { ...formFields }]);
  const removeSkill = () => {
    if (skillsList.length > 1) setSkillsList((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (skillsList) {
      setResumeContent({ ...resumeContent, skills: skillsList });
      const hasData = skillsList.some((skill) =>
        Object.values(skill).some((val) => val !== "")
      );
      setIsNextEnabled(hasData);
    }
  }, [skillsList, setIsNextEnabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = skillsList.some((skill) =>
      Object.values(skill).some((val) => val === "")
    );
    if (hasEmptyFields) {
      toast("Please fill out all fields.❌");
      return;
    }
    try {
      setLoading(true);
      const data = {
        data: {
          skills: skillsList.map((skill) => ({
            name: skill.name || null,
            rating: skill.rating || null,
          })),
        },
      };
      await updateResume(params?.resumeId, data);
      toast("Skills saved successfully ✅");
      setIsNextEnabled(true);
    } catch (err) {
      console.error(err);
      toast("Failed to save skills ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!skillsList) return null;

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Skills</h2>
      <p className="text-sm text-gray-600 mb-3">Add your skills below.</p>

      <form onSubmit={handleSubmit}>
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label className="text-sm font-medium">Skill Name</label>
              <Input
                name="name"
                value={skill.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Progress (out of 100)
              </label>
              <Input
                name="rating"
                value={skill.rating}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-2 sm:gap-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button type="button" onClick={addMoreSkills}>
              + Add More
            </Button>
            <Button type="button" onClick={removeSkill}>
              - Remove
            </Button>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-br from-[#00203F] via-[#3B2F72] to-[#7C3AED] font-body cursor-pointer hover:scale-107 active:scale-95 transition-all text-white font-[400px]"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Skills;
