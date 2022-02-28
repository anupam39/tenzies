// import logo from './logo.svg';
import './App.css';
import React,{useState} from "react"
import Die from "./Components/Die"
import { nanoid } from 'nanoid';

export default function App() {
  
  const[dice, setDice] = useState(allNewDice())

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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
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
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="roll-dice"
      onClick={rollDice}>Roll</button>
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