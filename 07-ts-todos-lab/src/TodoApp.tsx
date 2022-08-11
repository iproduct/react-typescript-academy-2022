import React, { Component, MouseEventHandler } from 'react';
import logo from './logo.svg';
import './App.css';


export interface TodoAppState {
  friends: string[];
  count: number;
  filterText: string
}

export default class AppClass extends Component<{}, TodoAppState> {
  state: Readonly<TodoAppState> = {
    friends: ['Ivan', 'Hristo', 'Petar'],
    count: 0,
    filterText: 'filter you'
  }

  // constructor(props: AppProps) {
  //   super(props);
  // }

  addFriend = () => {
    this.setState((state: TodoAppState) => ({
      friends: [...state.friends, `friend - ${state.count}`],
        count: state.count + 1
    }));
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React TODOs Demo</h2>
      </header>
    </div>
    );
  }
}



