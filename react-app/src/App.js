import './App.css'
import React, { useState } from 'react'

function App () {
  const [open, setOpen] = useState(false)
  const [attempt, setAttempt] = useState([]);
  const [prompt, setPrompt] = useState([]);
  const [response, setResponse] = useState([]);
  const [diff, setDiff] = useState(['small']);
  const [history, setHistory] = useState(['']);

  const handleChangeAttempt = (e) => {
    setAttempt(e.target.value);
  };

  const handleChangePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse('Loading...')
    fetch('http://localhost:5000/generate/' + encodeURIComponent(encodeURIComponent(prompt))
      + "/" + encodeURIComponent(encodeURIComponent(attempt)) + "/" + diff + "/")
      .then(response => response.text())
      .then(data => {
        let success = !data.includes('404 Not Found');
        console.log(success);
        if (success) {
          // setResponse(data.split('content=\'')[1].split('\'')[0]);
          setResponse(data);
          setHistory("* " + prompt + "\n\n" + history)
        } else {
          setResponse('Invalid Input!');
        }
      });
  };

  const capitalize = (s) => {
    return String(s).charAt(0).toUpperCase() + String(s).slice(1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="History-top">History</div>
        <div className="History-bottom">{history}</div>
        <div className="Title">LeetCode Hint Generator</div>
        <div className="Dropdown-container">
          <div className="Dropdown-trigger" onClick={() => {setOpen(!open)}}>
            <button className="Dropdown-button">Hint Difficulty</button>
          </div>
          <div className={'Dropdown-menu ' + (open ? 'active' : 'inactive')}>
            <ul>
              <div onClick={() => setDiff('small')}><DropdownItem text={'Small'}/></div>
              <div onClick={() => setDiff('medium')}><DropdownItem text={'Medium'}/></div>
              <div onClick={() => setDiff('large')}><DropdownItem text={'Large'}/></div>
            </ul>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea className="Response" value={response}/>
          <input className="Attempt" placeholder="Enter current code here." onChange={handleChangeAttempt}/>
          <input className="Prompt" placeholder="Enter prompt text here." onChange={handleChangePrompt}/>
          <button className="Generate">Generate {capitalize(diff)} Hint</button>
        </form>
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
