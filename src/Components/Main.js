import React from 'react'
import "../Stylesheets/Main.css"

const Main = (props) => {
  return (
    <main>
        <h1>Quizzical</h1>
        <p>Test your knowledge on Films. Take a mini quiz in our app and check your vitals.</p>
        <button onClick={props.handleClick}>Take Quiz</button>
    </main>
  )
}

export default Main