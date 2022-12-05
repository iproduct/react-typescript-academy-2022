import React, { useRef } from 'react';
import './App.css';
import Countdown, { CountdownHandle } from './components/Countdown';
import UncontrolledFormClass from './components/UncontrolledFormClass';
import { UncontrolledFormLambda } from './components/UncontrolledFormLambda';

function App() {
  const ref = useRef<CountdownHandle>(null);
  return (
    <div className="App">
      <header className="App-header">
        <Countdown ref={ref}/>
        <button onClick={() => {ref.current?.start()}}>Do</button>
      </header>
    </div>
  );
}

export default App;
