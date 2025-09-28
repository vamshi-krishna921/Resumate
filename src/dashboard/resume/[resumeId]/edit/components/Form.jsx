import React, { useState } from "react";
import PersonalDetails from "./formComponents/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Summary from "./formComponents/Summary";

function Form({ templateId }) {
  const [activeNextButton, setActiveNextButton] = useState(1);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  return (
    <div>
      {/* Next Button */}
      <div className="flex items-center justify-end gap-2.5">
        {activeNextButton > 1 && (
          <Button
            size="sm"
            onClick={() => setActiveNextButton((prev) => prev - 1)}
          >
            <ArrowLeft />
          </Button>
        )}
        <Button
          size="sm"
          disabled={!isNextEnabled}
          onClick={() => setActiveNextButton((prev) => prev + 1)}
        >
          Next
          <ArrowRight />
        </Button>
      </div>
      {/* Personal details */}
      {activeNextButton === 1 && (
        <PersonalDetails setIsNextEnabled={setIsNextEnabled} />
      )}
      {/* Summary */}
      {activeNextButton === 2 && <Summary setIsNextEnabled={setIsNextEnabled}/>}
      {/* Experience for professional (templateId : 2) / Education fro fresher*/}

      {/* Education for professional / projects for fresher*/}

      {/* Skills */}

      {/* Achievements */}
    </div>
  );
}

export default Form;
