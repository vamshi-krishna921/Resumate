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
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [educationList, setEducationList] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (
      Array.isArray(resumeContent.education) &&
      resumeContent.education.length > 0
    ) {
      setEducationList(resumeContent.education);
    } else {
      setEducationList([{ ...formFields }]);
    }
  }, [resumeContent]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...educationList];
    updatedList[index][name] = value;
    setEducationList(updatedList);
  };

  const addMoreEducation = () =>
    setEducationList([...educationList, { ...formFields }]);
  const removeEducation = () => {
    if (educationList.length > 1) setEducationList((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (educationList) {
      setResumeContent({ ...resumeContent, education: educationList });
      const hasData = educationList.some((edu) =>
        Object.values(edu).some((val) => val !== "")
      );
      setIsNextEnabled(hasData);
    }
  }, [educationList, setIsNextEnabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = educationList.some((edu) =>
      Object.values(edu).some((val) => val === "")
    );
    if (hasEmptyField) {
      toast("Please fill all the fields ❌");
      return;
    }
    try {
      setLoading(true);
      const data = {
        data: {
          education: educationList.map((edu) => ({
            universityName: edu.universityName || null,
            degree: edu.degree || null,
            major: edu.major || null,
            cgpa: edu.cgpa || null,
            startDate: edu.startDate || null,
            endDate: edu.endDate || null,
          })),
        },
      };
      await updateResume(params?.resumeId, data);
      toast("Education saved successfully ✅");
      setIsNextEnabled(true);
    } catch (err) {
      console.error(err);
      toast("Failed to save education ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!educationList) return null;

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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 my-4 rounded-lg border border-gray-200"
          >
            <div>
              <label className="text-sm font-medium">University</label>
              <Input
                name="universityName"
                value={edu.universityName}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Degree</label>
              <Input
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Branch/Course</label>
              <Input
                name="major"
                value={edu.major}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">CGPA</label>
              <Input
                name="cgpa"
                value={edu.cgpa}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                name="startDate"
                type="date"
                value={edu.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                name="endDate"
                placeholder="Currently studying? Add 'Present'"
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-2 sm:gap-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button type="button" onClick={addMoreEducation}>
              + Add More
            </Button>
            <Button type="button" onClick={removeEducation}>
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

export default Education;
