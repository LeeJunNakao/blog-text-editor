import React from 'react';
import Reader from './components/Reader';
import { text} from "./mock"
import './App.css';

function App() {
  return (
    <div className="App">
      <Reader>{text}</Reader>
    </div>
  );
}

export default App;
