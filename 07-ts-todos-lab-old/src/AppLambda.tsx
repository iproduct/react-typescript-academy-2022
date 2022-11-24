import React, { Dispatch, SetStateAction, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export interface AppProps {
  name: string;
  country: string;
}


export const AppLambda = ({ name, country }:AppProps) => {
  const [friends, setFriends]: [string[], Dispatch<SetStateAction<string[]>>] =
    useState(['Ivan', 'Hristo', 'Petar']);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Hello {name} from {country}!
        </h2>
        <h3>
          Friends:
        </h3>
        <ul>
          {friends.map(f => (<li key={f} className='friend'>{f}</li>))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default AppLambda;