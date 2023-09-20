import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from "reducers/notificationReducer"

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
  const { message, type } = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

    return () => clearTimeout(timer)
  }, [dispatch, message])

  if (message === "") {
    return null
  }

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
