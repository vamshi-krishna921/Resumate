import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: " ",
};
function Experience() {
  const [experienceList, setExperienceList] = useState([formFields]);

  //*Handle change event for input fields
  function handleChange(index, e){
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[index][e.target.name] = e.target.value;
    setExperienceList(updatedExperienceList);
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Experience</h2>
      <p className="text-sm text-gray-600 mb-3">
        Add your professional Experience
      </p>
      {experienceList.map((experience, index) => (
        <div key={index}>
          <div className="grid grid-cols-2">
            <div className="mt-3">
              <label htmlFor="title">Position Title</label>
              <Input name="title" onChange={(e) => handleChange(index,e)}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Experience;
