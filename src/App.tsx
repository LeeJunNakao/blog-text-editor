import React from 'react';
import Reader from './components/Reader';
import { text } from './mock';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  docco,
  defaultStyle,
  dracula,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Reader>{text}</Reader>
    </div>
  );
}

export default App;
