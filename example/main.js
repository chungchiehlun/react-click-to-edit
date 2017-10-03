import React from 'react';
import ReactDOM from 'react-dom';
import ClickToEdit from '../build/index.min';
import './main.css';

const App = () => (
  <ClickToEdit
    customInputClass='customInputClass'
    >Hello World
  </ClickToEdit>
)

ReactDOM.render(<App />, document.getElementById('app'));
