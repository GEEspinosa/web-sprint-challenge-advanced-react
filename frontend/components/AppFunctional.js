import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = 'http://localhost:9000/api/result'

const grid = [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3]]

export default function AppFunctional(props) {

  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.



  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    for (let i = 0 ; i < grid.length; i++){
      if (i === index) return (grid[i])
    }   
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${getXY()[0]}, ${getXY()[1]})`
  }

  function reset() {
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    
    if (direction === 'left' && (getXY()[0] === 1) ) {setMessage(`You can't go ${direction}`)}
    if (direction === 'up' && (getXY()[1] === 1) ) {setMessage(`You can't go ${direction}`)}
    if (direction === 'right' && (getXY()[0] === 3)) {setMessage(`You can't go ${direction}`)}
    if (direction === 'down' && (getXY()[1] === 3)) {setMessage(`You can't go ${direction}`)}

    
    if (direction === 'left' && (getXY()[0] !== 1) ) {setIndex(index - 1), setSteps(steps+1)}
    if (direction === 'up' && (getXY()[1] !== 1) ) {setIndex(index -3), setSteps(steps+1)}
    if (direction === 'right' && (getXY()[0] !== 3)) {setIndex(index + 1), setSteps(steps+1)}
    if (direction === 'down' && (getXY()[1] !== 3)) {setIndex(index + 3), setSteps(steps+1)}
    

  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly. 
    getNextIndex(evt.target.id)
    
  }

  function onChange(evt) {
    const { value } = evt.target
    setEmail(value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post(URL, {email: email, steps: steps, x: (getXY()[0]), y: (getXY()[1])})
      .then (res => setMessage(res.data.message))
      .catch (err => setMessage(err.response.data.message))
    setEmail(initialEmail)
    
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates" data-testid = 'coordinates'>{getXYMessage()}</h3>
        <h3 id="steps" data-testid = 'steps'>{steps !== 1 ? `You moved ${steps} times`: `You moved ${steps} time`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick = {move}>LEFT</button>
        <button id="up" onClick = {move}>UP</button>
        <button id="right" onClick = {move}>RIGHT</button>
        <button id="down" onClick = {move}>DOWN</button>
        <button id="reset" onClick = {reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" value = {email} onChange = {onChange}></input>
        <input id='submit' data-testid="submit" type="submit" onClick= {onSubmit}></input>
      </form>
    </div>
  )
}
