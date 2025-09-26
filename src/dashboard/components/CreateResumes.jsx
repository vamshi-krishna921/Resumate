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

function CreateResumes() {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  //* Function to handle creating a new resume
  const handleCreateResume = () => {
    setLoading(true);
    const id = uuidv4();
    const data = {
      resumeId: id,
      title: resumeTitle,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    createResume(data)
      .then((res) => {
        console.log("Resume created successfully:", res.data);
        setResumeTitle("");
        setOpenDialogBox(false);
        setLoading(false);
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
              disabled={resumeTitle.trim() === ""||loading}
              onClick={handleCreateResume}
            >
              {loading ? <LoaderCircle className="animate-spin"/> : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateResumes;
