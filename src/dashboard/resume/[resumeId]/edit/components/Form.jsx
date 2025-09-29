import React, { useState } from "react";
import PersonalDetails from "./formComponents/PersonalDetails";
import Summary from "./formComponents/Summary";
import Experience from "./formComponents/Experience";
import Education from "./formComponents/Education";
import Projects from "./formComponents/Projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Form({ templateId }) {
  const [activeStep, setActiveStep] = useState(0); // 0-indexed steps
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Define steps as an array
  const steps = [
    <PersonalDetails setIsNextEnabled={setIsNextEnabled} />,
    <Summary setIsNextEnabled={setIsNextEnabled} />,
    templateId === 2 ? (
      <Experience setIsNextEnabled={setIsNextEnabled} />
    ) : (
      <Education setIsNextEnabled={setIsNextEnabled} />
    ),
    templateId === 2 ? (
      <Education setIsNextEnabled={setIsNextEnabled} />
    ) : (
      <Projects setIsNextEnabled={setIsNextEnabled} />
    ),
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      setIsNextEnabled(false); // Reset next button for new step
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      setIsNextEnabled(true); // optional: keep previous step saved
    }
  };

  return (
    <div>
      {/* Step navigation */}
      <div className="flex items-center justify-end gap-2.5 mb-4">
        {activeStep > 0 && (
          <Button size="sm" onClick={handlePrev}>
            <ArrowLeft />
          </Button>
        )}
        <Button size="sm" disabled={!isNextEnabled} onClick={handleNext}>
          Next <ArrowRight />
        </Button>
      </div>

      {/* Render the steps */}
      {steps[activeStep]}
    </div>
  );
}

export default Form;
