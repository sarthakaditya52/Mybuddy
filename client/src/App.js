import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavabr from './components/AppNavbar';
import Login from './components/Login';
import Question from './components/Question';
function App() {
  return (
    <div id="container">
          <AppNavabr />
          <Question />
    </div>
  );
}

export default App;
