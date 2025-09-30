import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "@/contextApi/ResumeContext";
import { toast } from "sonner";
import { data, useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { LoaderCircle } from "lucide-react";

const formFields = {
  title: "",
  description: "",
};

function Achievements({ setIsNextEnabled }) {
  const [achievementsList, setAchievementsList] = useState(null);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //* Enable Next button if at least one achievement has data
  useEffect(() => {
    if (
      Array.isArray(resumeContent?.achievements) &&
      resumeContent.achievements.length > 0
    ) {
      setAchievementsList(resumeContent.achievements);
    } else {
      setAchievementsList([{ ...formFields }]);
    }
  }, [resumeContent]);

  //* Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...achievementsList];
    updatedList[index][name] = value;
    setAchievementsList(updatedList);
  };

  //* Add/remove achievement forms
  const addMoreAchievements = () =>
    setAchievementsList([...achievementsList, { ...formFields }]);
  const removeAchievement = () => {
    if (achievementsList.length > 1)
      setAchievementsList((prev) => prev.slice(0, -1));
  };

  //* Enable Next button
  useEffect(() => {
    if (achievementsList) {
      setResumeContent({ ...resumeContent, achievements: achievementsList });
      const hasData = achievementsList.some((achievement) =>
        Object.values(achievement).some((val) => val !== "")
      );
      setIsNextEnabled(hasData);
    }
  }, [achievementsList, setIsNextEnabled]);

  //* Submit achievements to Strapi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = achievementsList.some((achievement) =>
      Object.values(achievement).some((val) => val === "")
    );
    if (hasEmptyFields) {
      toast("Please fill out all fields.❌");
      return;
    }
    try {
      setLoading(true);
      const data = {
        data: {
          achievements: achievementsList.map((achievement) => ({
            title: achievement.title || null,
            description: achievement.description || null,
          })),
        },
      };
      await updateResume(params?.resumeId, data);
      toast("Achievements saved successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Failed to save achievements ❌");
    } finally {
      setLoading(false);
    }
  };
  if (!achievementsList) return null;
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Achievements</h2>
      <p className="text-sm text-gray-600 mb-3">Add your achievements below.</p>

      <form onSubmit={handleSubmit}>
        {achievementsList.map((achievement, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label>Title</label>
              <Input
                name="title"
                value={achievement.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>Description</label>
              <Textarea
                name="description"
                value={achievement.description}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button type="button" onClick={addMoreAchievements}>
              + Add More
            </Button>
            <Button type="button" onClick={removeAchievement}>
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

export default Achievements;
