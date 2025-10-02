import React from "react";

function PersonalDetails({ resumeContent }) {
  const cleanUrl = (url) => url.replace(/^https?:\/\//, "");

  const contactDetails = [
    resumeContent?.email && {
      label: resumeContent.email,
      href: `mailto:${resumeContent.email}`,
    },
    resumeContent?.phone && {
      label: resumeContent.phone,
      href: `tel:${resumeContent.phone}`,
    },
    resumeContent?.linkedin && {
      label: cleanUrl(resumeContent.linkedin),
      href: resumeContent.linkedin,
    },
    resumeContent?.github && {
      label: cleanUrl(resumeContent.github),
      href: resumeContent.github,
    },
  ].filter(Boolean);

  return (
    <>
      <div className="font-resume my-4 px-2 print:px-0">
        <h1 className="font-bold text-lg sm:text-xl print:text-xl text-center break-words">
          {resumeContent?.firstName} {resumeContent?.lastName}
        </h1>
        <h2 className="text-center text-sm sm:text-md print:text-md font-semibold break-words">
          {resumeContent?.jobTitle}
        </h2>
        <h2 className="text-center text-sm sm:text-md print:text-md break-words">
          {resumeContent?.address}
        </h2>
      </div>

      <div
        className={`mt-4 grid gap-1 font-resume px-2 print:px-0 text-center
        ${contactDetails.length === 2 ? "grid-cols-1 sm:grid-cols-2" : ""}
        ${contactDetails.length === 3 ? "grid-cols-1 sm:grid-cols-3" : ""}
        ${contactDetails.length === 4 ? "grid-cols-1 sm:grid-cols-2" : ""}
        ${contactDetails.length >= 5 ? "grid-cols-1 sm:grid-cols-3" : ""}`}
      >
        {contactDetails.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs print:text-xs font-normal hover:underline cursor-pointer text-blue-500 whitespace-normal break-words print:whitespace-nowrap"
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
