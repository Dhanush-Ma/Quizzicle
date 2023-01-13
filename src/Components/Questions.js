import React, { useEffect, useState } from 'react'
import "../Stylesheets/Questions.css"
import {decode} from 'html-entities';

const Questions = (props) => {
  const styles = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "transparent"
  }
  const correctAnswerStyles = {
    backgroundColor: "#94D7A2"
  }

  const incorrectAnswerStyles = {
    backgroundColor: "#F8BCBC"
  }
  return (
    <>
        <div className='question-block'>
            <p className='question'>{decode(props.question)}</p>
            <div className="options">
                <p 
                  onClick={() => props.handleClick(props.id,props.options[0],0)} 
                  className="option" 
                  style={props.showAnswers ? (props.correctAnswer === props.options[0]) ? correctAnswerStyles 
                         : props.selectedChoice === props.options[0] ?  incorrectAnswerStyles : {}
                         : props.selectedChoice === props.options[0] ? styles : {}}
                >
                    {decode(props.options[0])}
                </p>

                <p 
                  onClick={() => props.handleClick(props.id,props.options[1],1)} 
                  className="option"
                  style={props.showAnswers ? (props.correctAnswer === props.options[1]) ? correctAnswerStyles 
                    : props.selectedChoice === props.options[1] ?  incorrectAnswerStyles : {} 
                    : props.selectedChoice === props.options[1] ? styles : {}}

                >
                    {decode(props.options[1])}
                </p>

                <p 
                  onClick={() => props.handleClick(props.id,props.options[2],2)} 
                  className="option"
                  style={props.showAnswers ? (props.correctAnswer === props.options[2]) ? correctAnswerStyles 
                    : props.selectedChoice === props.options[2] ?  incorrectAnswerStyles: {} 
                    : props.selectedChoice === props.options[2] ? styles : {}}

                >
                   {decode(props.options[2])}
                </p>
                <p 
                  onClick={() => props.handleClick(props.id,props.options[3],3)} 
                  className="option"
                  style={props.showAnswers ? (props.correctAnswer === props.options[3]) ? correctAnswerStyles 
                    : props.selectedChoice === props.options[3] ?  incorrectAnswerStyles : {} 
                    : props.selectedChoice === props.options[3] ? styles : {}}

                >
                   {decode(props.options[3])}
                </p>
            </div>
        </div>
    </>
  )
}

export default Questions

