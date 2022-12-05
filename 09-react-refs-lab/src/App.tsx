import React from 'react';
import './App.css';
import UncontrolledFormClass from './components/UncontrolledFormClass';
import { UncontrolledFormLambda } from './components/UncontrolledFormLambda';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UncontrolledFormLambda />
      </header>
    </div>
  );
}

export default App;
