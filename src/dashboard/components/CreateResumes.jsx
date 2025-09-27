import { Button } from "@/components/ui/button";
import { LoaderCircle, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { createResume } from "./../../../service/GlobalAPIs";
import { useNavigate } from "react-router-dom";

function CreateResumes() {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const templates = [
    { id: 0, name: "Modern" },
    { id: 1, name: "Minimalist" },
    { id: 2, name: "Creative" },
  ];
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  console.log("Selected Template ID:", selectedTemplate);
  //* Function to handle creating a new resume
  const handleCreateResume = () => {
    setLoading(true);
    const id = uuidv4();
    const data = {
      resumeId: id,
      title: resumeTitle,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      templateId: selectedTemplate,
    };

    createResume(data)
      .then((res) => {
        console.log("Resume created successfully:", res.data);
        setResumeTitle("");
        setSelectedTemplate(templates[0].id);
        setOpenDialogBox(false);
        setLoading(false);
        navigate(`/dashboard/resume/${id}/edit`);
      })
      .catch((err) => {
        console.error("Error creating resume:", err);
        setLoading(false);
      });
  };
  return (
    <>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 py-35 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        onClick={() => setOpenDialogBox(true)}
      >
        <PlusSquare className="text-gray-500" />
      </div>

      {/* Dialog box */}
      <Dialog open={openDialogBox} onOpenChange={setOpenDialogBox}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your new resume</DialogTitle>
            <DialogDescription>
              <div className="text-lg font-semibold font-body">Enter title</div>
              <Input
                placeholder="Ex: Frontend resume"
                className="mt-2 text-black"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
              <div className="mt-4">
                <div className="text-lg font-semibold font-body mb-2">
                  Select template
                </div>
                <div className="flex gap-3 flex-wrap focus:border-blue-600">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant={
                        selectedTemplate === template.id ? "default" : "outline"
                      }
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setOpenDialogBox(false)}
              className="mr-2 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={resumeTitle.trim() === "" || loading}
              onClick={handleCreateResume}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateResumes;
