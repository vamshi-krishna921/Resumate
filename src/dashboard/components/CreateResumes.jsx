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
import professionalTemplate from "../../assets/template1.avif";
import fresherTemplate from "../../assets/Fresher.jpeg";

function CreateResumes() {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const templates = [
    { id: 1, name: "Fresher", img: fresherTemplate },
    { id: 2, name: "Professional", img: professionalTemplate },
  ];
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
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
        const createdDoc = res.data.data;
        const docId = createdDoc.documentId;

        setResumeTitle("");
        setSelectedTemplate(templates[0].id);
        setOpenDialogBox(false);
        setLoading(false);

        // Navigate with documentId
        navigate(`/dashboard/resume/${docId}/edit`);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error creating resume:", err);
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
              <div className="text-lg text-start font-semibold font-body">
                Enter title
              </div>
              <Input
                placeholder="Ex: Frontend resume"
                className="mt-2 text-black"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />

              {/* Select templates */}
              <div className="mt-4">
                <div className="text-lg font-semibold font-body mb-2">
                  Select template
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`cursor-pointer border-2 rounded-lg overflow-hidden transition 
                        ${
                          selectedTemplate === template.id
                            ? "border-blue-500 ring-2 ring-blue-300"
                            : "border-gray-300"
                        }`}
                    >
                      <img
                        src={template.img}
                        alt={template.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center font-medium text-sm">
                        {template.name}
                      </div>
                    </div>
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
