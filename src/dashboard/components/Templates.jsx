import React from "react";
import template1 from "../../assets/template1.avif";
import template2 from "../../assets/template2.avif";
import { useNavigate } from "react-router-dom";

function Templates() {
  const templates = [
    { id: 1, name: "Template 1", thumbnail: template1 },
    { id: 2, name: "Template 2", thumbnail: template2 },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap items-center justify-start p-4 px-7 gap-6 md:gap-8 lg:gap-10 w-full mt-4 md:mt-5 lg:mt-7">
      h
      {templates.map((template) => (
        <div className="w-[250px] h-[370px] rounded-2xl bg-gray-100 shadow shadow-gray-200 hover:scale-108 transform transition duration-300 cursor-pointer flex items-center justify-center" onClick={() => navigate(`/dashboard/templates/${template.id}/${resumeId}/edit`)}>
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-[90%] h-[90%] rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}

export default Templates;
