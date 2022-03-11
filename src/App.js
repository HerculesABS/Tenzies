import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"



export default function App () {
   
    const [dice, setDice] = React.useState(allNewDice())
    
    //The tenzies state that has a default of false represents whether the user has won the game yet or not.
    const [tenzies, setTenzies] = React.useState(false) 

    //The effect check two conditions : 1.All dice are held, 2.All dice have the same value
    React.useEffect(() => {
        const allHeld = dice.every(dice => dice.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You Won! Congrats !!")
        }
    })


    //A function that generate the random numbers from 1 to 6
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
            }
    }    

    //In this function we loop our 10 dices and we push into the array our prev function 'generateNewDie()'
    function allNewDice(){
        const newDice = []
        for (let i = 0; i<10 ; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    console.log(allNewDice)


    //This function look through the existing dice and not rolling any that are bening 'held', just rolling the dice that are not 'held'.
    function rollDice() {
        if (!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld?
                    die :
                    generateNewDie()
        }))
        } else { 
            setTenzies(false)
            setDice(allNewDice())
        }
        
    }


    //In this function we are checking for the 'id' of the dice to determine which one to flip 'isHeld' on. And then flip the 'isHeld' property
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld } :
                die
        }))
    }
    const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>
    ))

    return (

        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
            className="roll-dice"
            onClick={rollDice}>
                {tenzies? "New Game" : "Roll"}
                </button>
        </main>
    )
}

