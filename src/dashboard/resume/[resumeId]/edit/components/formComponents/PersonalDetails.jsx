import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeContext } from "@/contextApi/ResumeContext";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { updateResume } from "./../../../../../../../service/GlobalAPIs";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner"

function PersonalDetails({ setIsNextEnabled }) {
  const params = useParams();
  const { resumeContent, setResumeContent } = useContext(ResumeContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  //* Handle form changes and submit form data 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsNextEnabled(false);
    setFormData({ ...formData, [name]: value });
    setResumeContent({
      ...resumeContent,
      [name]: value,
    });
  };

  //* Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      data: formData,
    };
    setLoading(true);
    updateResume(params?.resumeId, data)
      .then((res) => {
        console.log(res);
        setIsNextEnabled(true);
        setLoading(false);
        toast("Data has been added. ✅");
      })
      .catch((err) => {
        alert("Failed to add data.");
        setLoading(false);
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 mt-3 border-blue-900">
      <h2 className="text-lg font-bold">Personal Details</h2>
      <p className="text-sm text-gray-600 mb-3">
        Start with your basic details
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 mb-3">
        {/* First Name */}
        <div>
          <label className="text-sm text-black" htmlFor="firstName">
            First Name
          </label>
          <Input
            name="firstName"
            value={resumeContent.firstName || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm text-black" htmlFor="lastName">
            Last Name
          </label>
          <Input
            name="lastName"
            value={resumeContent.lastName || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Job Title */}
        <div className="col-span-2">
          <label className="text-sm text-black" htmlFor="jobTitle">
            Job Title
          </label>
          <Input
            name="jobTitle"
            value={resumeContent.jobTitle || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="text-sm text-black" htmlFor="address">
            Address
          </label>
          <Input
            name="address"
            value={resumeContent.address || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-black" htmlFor="phone">
            Phone
          </label>
          <Input
            name="phone"
            value={resumeContent.phone || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-black" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={resumeContent.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="text-sm text-black" htmlFor="linkedin">
            LinkedIn
          </label>
          <Input
            name="linkedin"
            value={resumeContent.linkedin || ""}
            onChange={handleChange}
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="text-sm text-black" htmlFor="github">
            GitHub
          </label>
          <Input
            name="github"
            value={resumeContent.github || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2 flex justify-end mt-3">
          <Button disable={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
