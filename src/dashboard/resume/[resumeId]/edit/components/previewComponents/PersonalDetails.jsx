import React from "react";

function PersonalDetails({ resumeContent }) {
  const cleanUrl = (url) => url.replace(/^https?:\/\//, ""); // remove http:// or https://

  const contactDetails = [
    resumeContent?.email && {
      label: resumeContent.email, // show email only
      href: `mailto:${resumeContent.email}`,
    },
    resumeContent?.phone && {
      label: resumeContent.phone, // show phone only
      href: `tel:${resumeContent.phone}`,
    },
    resumeContent?.linkedin && {
      label: cleanUrl(resumeContent.linkedin), // show clean LinkedIn
      href: resumeContent.linkedin,
    },
    resumeContent?.github && {
      label: cleanUrl(resumeContent.github), // show clean GitHub
      href: resumeContent.github,
    },
  ].filter(Boolean);

  return (
    <>
      {/* Personal Details Top section */}
      <div className="font-resume my-4">
        <h1 className="font-bold text-xl text-center">
          {resumeContent?.firstName} {resumeContent?.lastName}
        </h1>
        <h2 className="text-center text-md font-semibold">
          {resumeContent?.jobTitle}
        </h2>
        <h2 className="text-center text-md">{resumeContent?.address}</h2>
      </div>

      {/* Personal Details Bottom section */}
      <div
        className={`mt-4 grid gap-1 font-resume
        ${contactDetails.length === 2 ? "grid-cols-2" : ""}
        ${contactDetails.length === 3 ? "grid-cols-3" : ""}
        ${contactDetails.length === 4 ? "grid-cols-2" : ""}
        ${contactDetails.length >= 5 ? "grid-cols-3" : ""}`}
      >
        {contactDetails.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-xs font-normal hover:underline cursor-pointer text-blue-500 text-center"
          >
            {item.label}
          </a>
        ))}
      </div>
      <hr className="border-2 border-[#4e4e4e] my-2" />
    </>
  );
}

export default PersonalDetails;
