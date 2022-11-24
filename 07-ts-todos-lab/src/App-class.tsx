import React, { Component } from 'react';
import './App.css';

interface AppState {
  counter: number;
}


export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    counter: 0
  }
  interval: NodeJS.Timer | undefined;

  componentDidMount(): void {
    this.interval = setInterval(() => {
      this.setState(({ counter }) => ({ counter: counter + 1 }));
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React TODOs Demo</h1>
          <h2>Counter: {this.state.counter}</h2>
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

