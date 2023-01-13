import React, { useState, useEffect } from 'react'
import "./Stylesheets/App.css"
import Main from "./Components/Main"
import Questions from "./Components/Questions"
import {nanoid} from "nanoid"




const App = () => {
  
  const [quizScore, setQuizScore] = useState(0)
  const [newQuestions, getNewQuestions] = useState(false)
  const [startQuiz, setStartQuiz] = useState(false)
  const [questions, setQuestions] = useState([])
  const [check, setCheck] = useState(false)
  const [options, setOptions] = useState({
    optionSelected: [false,false,false,false,false],
    selectedChoice: ["","","","",""]
  })
// questons from API
useEffect(() => {
    async function getQuestionsFromAPI(){
        const res = await  fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple")
        const data =  await res.json()

         const questionArray = data.results.map((ques) =>{
            let incorrectOptions = ques.incorrect_answers
            incorrectOptions.push(ques.correct_answer)
            return {question: ques.question,
                    correctAnswer: ques.correct_answer,
                    options: shuffleArray(incorrectOptions)
                }
        })
        console.log(questionArray)
        // state modified
        setQuestions(questionArray)
    } 

    function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1))  
                var temp = array[i]
                array[i] = array[j]
                array[j] = temp
    }  
   return array;
   }

    getQuestionsFromAPI()

 },[newQuestions])


const questionElements = questions.map((ques,index) => {
  return( <Questions 
              key = {nanoid()}
              id = {index}
              question = {ques.question}
              correctAnswer = {ques.correctAnswer}
              options = {ques.options}
              handleClick = {questionToggle}    
              isSelected = {options.optionSelected[index]}
              selectedChoice = {options.selectedChoice[index]}
              showAnswers = {check}
          />)
})

function takeQuiz() {
  setStartQuiz((prevOption) => !prevOption)
}

let ref;
function questionToggle(id,userChoice){
      setOptions((prevOptions) => {

        let optionSelectedArray = prevOptions.optionSelected.map((option,index) =>{
          if(id === index){
            if(prevOptions.selectedChoice[id] !== userChoice){
              return !option
            }else if(ref === userChoice){
              return !option
            }else if(ref !== userChoice){
              return option
            }else{
              return option
            }
          }else{
            return option
          }
      })
   
        let selectedChoiceArray = prevOptions.selectedChoice.map((choice, index) =>{
          return id === index ? (optionSelectedArray[index]) ? userChoice : '' : choice
        })

          return {
            optionSelected: optionSelectedArray,
            selectedChoice: selectedChoiceArray
          }
      })
      ref = userChoice
    }

    function checkAnswers(){
      let initialScore = 0
       setStartQuiz((prevRes) => !prevRes)
       setCheck((prevCheck) => !prevCheck)
       console.log(options.selectedChoice, questions[0].correctAnswer,questions[1].correctAnswer,questions[2].correctAnswer,questions[3].correctAnswer,questions[4].correctAnswer)
       for(let i=0; i<options.selectedChoice.length; i++){
        if(options.selectedChoice[i] == questions[i].correctAnswer){
          initialScore++
        }
      }
      setQuizScore(initialScore)
    }

    function regame(){
      setQuizScore(0)
      getNewQuestions((prev) => !prev)
      setCheck((prevCheck) => !prevCheck)
      setOptions({
    optionSelected: [false,false,false,false,false],
    selectedChoice: ["","","","",""]
  })
    }

  return (
    <div className='container'>
      
      {!startQuiz && !check && <Main handleClick={takeQuiz} />}
      {startQuiz && 
      <>
        <div className='questions-container'>
          {questionElements}
        </div>
        <button className='check-answers' onClick={checkAnswers}>Check Answers</button>
      </>
      }
      {
        check &&
        <>
          <div className='questions-container'>
          {questionElements}
          </div>
          <div className='results-display'>
            <p>You Scored {quizScore}/{options.selectedChoice.length}</p>
            <button className='check-answers' onClick={regame}>Play Again</button>
          </div>
        </>
      }
    </div>
  )
}

export default App


