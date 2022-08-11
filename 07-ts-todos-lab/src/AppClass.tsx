import React, { Component, MouseEventHandler } from 'react';
import logo from './logo.svg';
import './App.css';

export interface AppProps {
  name: string;
}

export interface AppState {
  friends: string[];
  count: number;
  filterText: string
}

export class AppClass extends Component<AppProps, AppState> {
  state: AppState = {
    friends: ['Ivan', 'Hristo', 'Petar'],
    count: 0,
    filterText: 'filter you'
  }

  // constructor(props: AppProps) {
  //   super(props);
  // }

  addFriend = () => {
    this.setState((state: AppState) => ({
      friends: [...state.friends, `friend - ${state.count}`],
        count: state.count + 1
    }));
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Hello from React {this.props.name}!
        </h2>
        <h3>
          Friends:
        </h3>
        <ul>
          {this.state.friends.map(f => (<li key={f} className='friend'>{f}</li>))}
        </ul>
        <button type="button" onClick={this.addFriend}>Add Friend</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn {'&amp;'} React
        </a>
      </header>
    </div>
    );
  }
}



