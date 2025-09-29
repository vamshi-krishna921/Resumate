import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "@/contextApi/ResumeContext";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const formFields = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
};

function Projects({ setIsNextEnabled }) {
  const [projectsList, setProjectsList] = useState([{ ...formFields }]);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //* Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...projectsList];
    updatedList[index][name] = value;
    setProjectsList(updatedList);
  };

  //* Add and Remove project
  const addMoreProjects = () =>
    setProjectsList([...projectsList, { ...formFields }]);
  const removeProject = () => {
    if (projectsList.length > 1) setProjectsList((prev) => prev.slice(0, -1));
  };

  //* Enable Next button
  useEffect(() => {
    setResumeContent({ ...resumeContent, projects: projectsList });
    const hasData = projectsList.some((proj) =>
      Object.values(proj).some((val) => val !== "")
    );
    setIsNextEnabled(hasData);
  }, [projectsList, setIsNextEnabled]);

  //* Submit projects to Strapi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const projectsData = projectsList
        .filter((proj) => Object.values(proj).some((val) => val !== ""))
        .map((proj) => ({
          title: proj.title || null,
          description: proj.description || null,
          startDate: proj.startDate || null,
          endDate: proj.endDate || null,
        }));

      const data = {
        data: {
          projects: projectsData,
        },
      };

      await updateResume(params?.resumeId, data);
      toast("Projects saved successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Failed to save projects ❌");
    } finally {
      setLoading(false);
    }
  };

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
            className="grid grid-cols-2 gap-3 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label>Project Title</label>
              <Input
                name="title"
                value={project.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>Description</label>
              <Textarea
                placeholder="Describe through points"
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>End Date</label>
              <Input
                name="endDate"
                placeholder="currently working add present"
                value={project.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button type="button" onClick={addMoreProjects}>
              + Add More Projects
            </Button>
            <Button type="button" onClick={removeProject}>
              - Remove Project
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

export default Projects;
