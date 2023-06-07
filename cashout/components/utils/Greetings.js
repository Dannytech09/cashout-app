import React from 'react'

const Greetings = () => {
    // 24 hours time
    let timeNow = new Date().getHours();

    let greetings =
      timeNow >= 1 && timeNow < 12
        ? "Good Morning"
        : timeNow >= 12 && timeNow < 16
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <span>{greetings}</span>
  )
}

export default Greetings