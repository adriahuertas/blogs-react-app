import React from "react";

const successStyles = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const errorStyles = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const Notification = ({ message, setMessage, type }) => {
  if (message === null) {
    return null;
  }


  setTimeout(() => {
    setMessage(null);
  }
  , 5000);

  return (
    <div className={type} style={type === "error" ? errorStyles : successStyles}>
      {message}
    </div>
  );
};

export default Notification;
