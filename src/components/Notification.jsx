import React from "react";

const Notification = ({ message, setMessage, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
