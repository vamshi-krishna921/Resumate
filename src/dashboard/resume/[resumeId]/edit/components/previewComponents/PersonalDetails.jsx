import React from 'react'

function PersonalDetails({resumeContent}) {
  return (
    <h1>{resumeContent?.firstName} {resumeContent?.lastName}</h1>
  )
}

export default PersonalDetails