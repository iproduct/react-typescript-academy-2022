import React from 'react';
import logo from './logo.svg';
import './App.css';

export interface AppProps {
  name: string;
}

export default function App({name}: AppProps): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
         Hello from React {name} Typescript!
        </h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reacx
        </a>
      </header>
    </div>
  );
}


