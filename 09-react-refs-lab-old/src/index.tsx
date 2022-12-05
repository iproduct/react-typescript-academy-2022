import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CountdownApp from './CountdownApp';
import VideoPlayerApp from './VideoPlayerApp';
import UncontrolledFormClass from './components/UncontrolledFormClass';
import UncontrolledFormApp from './UncontrolledFormApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <VideoPlayerApp /> */}
    <UncontrolledFormApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
