import './App.css'
import React, { useState } from 'react'

function App () {
  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <div className="History-top">History</div>
        <div className="History-bottom">* Given an array of integers nums and an integer target, return indices of the
          two numbers such that they add up to target.

          You may assume that each input would have exactly one solution, and you may not use the same element twice.

          You can return the answer in any order.
        </div>
        <div className="Title">LeetCode Hint Generator</div>
        <div className="Dropdown-container">
          <div className="Dropdown-trigger" onClick={() => {setOpen(!open)}}>
            <button className="Dropdown-button">Hint Difficulty</button>
          </div>
          <div className={'Dropdown-menu ' + (open ? 'active' : 'inactive')}>
            <ul>
              <DropdownItem text={'Level 1'}/>
              <DropdownItem text={'Level 2'}/>
              <DropdownItem text={'Level 3'}/>
            </ul>
          </div>
        </div>
        <button className="Generate">Generate Hint</button>
        <input className="Response"/>
        <input className="Attempt" placeholder="Enter current code here."/>
        <input className="Prompt" placeholder="Enter prompt text here."/>
      </header>
    </div>
  )
}

function DropdownItem (props) {
  return (
    <li className="Dropdown-item">
      {props.text}
    </li>
  )
}

export default App
