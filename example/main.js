import React from 'react';
import ReactDOM from 'react-dom';
import ClickToEdit from '../build/index.min';
import './main.css';

const App = () => (
  <ClickToEdit
    customInput='input'
    customText='text'
    >
    Click to edit here !
  </ClickToEdit>
)

ReactDOM.render(<App />, document.getElementById('app'));
