import React from "react"

const Accordion = ({ title, children }) => {
  return (
        <div className="accordion">
            <h3 className="accordion-title">{title}</h3>
            <div className="accordion-content">
                {children}
            </div>
        </div>
  )
}

export default Accordion
