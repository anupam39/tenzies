// import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from "react"
import Die from "./Components/Die"
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
       setTenzies(true)
    }
  }, dice)

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newArray = []
    for(let i=0; i<10; i++){
      newArray.push(generateNewDie())
    }
    return newArray
  }

  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  } else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return id === die.id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const dieElements = dice.map(item => (
    <Die value={item.value} 
    isHeld={item.isHeld} 
    key={item.id} 
    holdDice={() => holdDice(item.id)} />
  ))

  return(
    <main className="main-container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="roll-dice"
      onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}




















  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );