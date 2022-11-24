import React, { Component } from 'react';
import './App.css';
import { Todo } from './model/todos';

interface AppState {
  todos: Todo[];
}


export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    todos: []
  }
  interval: NodeJS.Timer | undefined;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React TODOs Demo</h1>
          
          {/* <button onClick={() => {
            this.setState(({ counter }) => ({ counter: counter + 1 }));
          }}>
            Update Counter
          </button> */}
        </header>
      </div>
    );
  }
}

