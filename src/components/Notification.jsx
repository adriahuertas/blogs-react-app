import NotificationContext from "context/NotificationContext"
import React, { useContext, useEffect } from "react"

const successStyles = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
}

const errorStyles = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
}

const Notification = () => {
  const [notification, setNotification] = useContext(NotificationContext)

  const { message, type } = notification

  if (message === null) {
    return null
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)

    return () => clearTimeout(t)
  }, [notification])
  return (
    <div
      className={type}
      style={type === "error" ? errorStyles : successStyles}
    >
      {message}
    </div>
  )
}

export default Notification
