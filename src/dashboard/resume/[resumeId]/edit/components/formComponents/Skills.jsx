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
  const [skillsList, setSkillsList] = useState([{ ...formFields }]);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //* Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...skillsList];
    updatedList[index][name] = value;
    setSkillsList(updatedList);
  };

  //* Add/remove skill rows
  const addMoreSkills = () => setSkillsList([...skillsList, { ...formFields }]);
  const removeSkill = () => {
    if (skillsList.length > 1) setSkillsList((prev) => prev.slice(0, -1));
  };

  //* Enable next button if at least one skill has data
  useEffect(() => {
    setResumeContent({ ...resumeContent, skills: skillsList });
    const hasData = skillsList.some((s) =>
      Object.values(s).some((val) => val !== "")
    );
    setIsNextEnabled(hasData);
  }, [skillsList, setIsNextEnabled]);

  //* Save to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        data: {
          skills: skillsList,
        },
      };
      await updateResume(params?.resumeId, data);

      toast("Skills saved successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Failed to save skills ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Skills</h2>
      <p className="text-sm text-gray-600 mb-3">Add your skills below.</p>

      <form onSubmit={handleSubmit}>
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label>Skill Name</label>
              <Input
                name="name"
                value={skill.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label>Progress (out of 100)</label>
              <Input
                name="rating"
                value={skill.rating}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button type="button" onClick={addMoreSkills}>
              + Add More
            </Button>
            <Button type="button" onClick={removeSkill}>
              - Remove
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

export default Skills;
