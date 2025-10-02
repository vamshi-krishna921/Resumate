import React, { useState } from "react";
import resumeIcon from "../../assets/resumeIcon.png";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteResumeById } from "../../../service/GlobalAPIs";
import { toast } from "sonner";

function PrevResumes({ resume }) {
  const navigate = useNavigate();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  async function deleteResume() {
    try {
      await deleteResumeById(resume.documentId);
      toast.success("Resume deleted successfully ✅");
      setDeleteAlertOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      toast.error("Failed to delete resume ❌");
    }
  }

  return (
    <div className="relative w-[288px] h-[400px]">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="hover:scale-103 rounded-lg w-full h-full flex flex-col gap-3.5 items-center justify-start cursor-pointer transition-transform duration-200">
          <div className="w-[98%] h-[90%] bg-color rounded-lg flex items-center justify-center">
            <img src={resumeIcon} alt="ResumeIcon" />
          </div>
          <h1 className="text-lg font-heading font-bold">{resume.title}</h1>
        </div>
      </Link>

      {/* Dropdown in top-right corner */}
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="p-2 rounded bg-gray-100 transition-transform duration-150 ease-in hover:scale-109 cursor-pointer text-3xl">
              ⋮
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteAlertOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Alert */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your
              resume and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteResume}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PrevResumes;
