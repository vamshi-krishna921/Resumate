import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useContext } from "react";
import { ResumeContext } from "@/contextApi/ResumeContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { LoaderCircle } from "lucide-react";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  cgpa: "",
  startDate: "",
  endDate: "",
};

function Education({ setIsNextEnabled }) {
  const [educationList, setEducationList] = useState([{ ...formFields }]);
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //* Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...educationList];
    updatedList[index][name] = value;
    setEducationList(updatedList);
  };

  //* Add and remove education forms
  const addMoreEducation = () =>
    setEducationList([...educationList, { ...formFields }]);
  const removeEducation = () => {
    if (educationList.length > 1) setEducationList((prev) => prev.slice(0, -1));
  };

  //* Enable Next button
  useEffect(() => {
    setResumeContent({ ...resumeContent, education: educationList });
    const hasData = educationList.some((edu) =>
      Object.values(edu).some((val) => val !== "")
    );
    setIsNextEnabled(hasData);
  }, [educationList, setIsNextEnabled]);

  //* Submit education data to Strapi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        data: {
          education: educationList,
        },
      };
      await updateResume(params?.resumeId, data);
      toast("Education saved successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Failed to save education ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-green-900">
      <h2 className="text-lg font-bold">Education</h2>
      <p className="text-sm text-gray-600 mb-3">
        Add your education details below.
      </p>

      <form onSubmit={handleSubmit}>
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label>University</label>
              <Input
                name="universityName"
                value={edu.universityName}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>Degree</label>
              <Input
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>Branch/Course</label>
              <Input
                name="major"
                value={edu.major}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>CGPA</label>
              <Input
                name="cgpa"
                value={edu.cgpa}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>Start Date</label>
              <Input
                name="startDate"
                type="date"
                value={edu.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label>End Date</label>
              <Input
                name="endDate"
                placeholder="Currently studying? Add 'Present'"
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button type="button" onClick={addMoreEducation}>
              + Add More
            </Button>
            <Button type="button" onClick={removeEducation}>
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

export default Education;
