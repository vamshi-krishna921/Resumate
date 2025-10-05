import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "@/contextApi/ResumeContext";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { LoaderCircle, Brain } from "lucide-react";
import { toast } from "sonner";

const formFields = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
};

function Projects({ setIsNextEnabled }) {
  const [projectsList, setProjectsList] = useState(null);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [aiLoadingIndex, setAiLoadingIndex] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (
      Array.isArray(resumeContent.projects) &&
      resumeContent.projects.length > 0
    ) {
      setProjectsList(resumeContent.projects);
    } else {
      setProjectsList([{ ...formFields }]);
    }
  }, [resumeContent]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...projectsList];
    updatedList[index][name] = value;
    setProjectsList(updatedList);
  };

  const addMoreProjects = () =>
    setProjectsList([...projectsList, { ...formFields }]);
  const removeProject = () => {
    if (projectsList.length > 1) setProjectsList((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (projectsList) {
      setResumeContent({ ...resumeContent, projects: projectsList });
      const hasData = projectsList.some((proj) =>
        Object.values(proj).some((val) => val !== "")
      );
      setIsNextEnabled(hasData);
    }
  }, [projectsList, setIsNextEnabled]);

  //* AI description generation
  const generateDescriptionUsingAI = async (index) => {
    const project = projectsList[index];
    if (!project.title) {
      toast("Please enter a project title first ❌");
      return;
    }

    const prompt = `Project title: ${project.title}. Generate a short professional description (3-4 lines) describing the project's purpose, tech stack, and impact. Use clear, resume-friendly language. Give in description no bold no points.`;

    setAiLoadingIndex(index);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/generate-summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      const generatedDescription = data.text || "";

      const updatedList = [...projectsList];
      updatedList[index].description = generatedDescription;
      setProjectsList(updatedList);
      setResumeContent({ ...resumeContent, projects: updatedList });

      toast("Description generated successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Failed to generate description ❌");
    } finally {
      setAiLoadingIndex(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = projectsList.some((proj) =>
      Object.values(proj).some((val) => val === "")
    );
    if (hasEmptyFields) {
      toast("Please fill out all fields.❌");
      return;
    }
    try {
      setLoading(true);
      const data = {
        data: {
          projects: projectsList.map((proj) => ({
            title: proj.title || null,
            description: proj.description || null,
            startDate: proj.startDate || null,
            endDate: proj.endDate || null,
          })),
        },
      };
      await updateResume(params?.resumeId, data);
      toast("Projects saved successfully ✅");
      setIsNextEnabled(true);
    } catch (err) {
      console.error(err);
      toast("Failed to save projects ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!projectsList) return null;

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Projects</h2>
      <p className="text-sm text-gray-600 mb-3">
        Add your awesome projects below.
      </p>

      <form onSubmit={handleSubmit}>
        {projectsList.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label className="text-sm font-medium">Project Title</label>
              <Input
                name="title"
                value={project.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Description</label>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => generateDescriptionUsingAI(index)}
                  disabled={aiLoadingIndex === index}
                  className="bg-gradient-to-br from-[#00203F] via-[#3B2F72] to-[#7C3AED] hover:scale-105 text-white transition-all"
                >
                  {aiLoadingIndex === index ? (
                    <LoaderCircle className="animate-spin w-4 h-4 mr-1" />
                  ) : (
                    <Brain className="w-4 h-4 mr-1" />
                  )}
                  Generate with AI
                </Button>
              </div>

              <Textarea
                placeholder="Describe through points"
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                name="endDate"
                placeholder="Currently working? Add 'Present'"
                value={project.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Button type="button" onClick={addMoreProjects}>
              + Add More Projects
            </Button>
            <Button type="button" onClick={removeProject}>
              - Remove Project
            </Button>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-br from-[#00203F] via-[#3B2F72] to-[#7C3AED] font-body cursor-pointer hover:scale-107 active:scale-95 transition-all text-white font-[400px]"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Projects;
