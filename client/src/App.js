import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavabr from './components/AppNavbar';
// import Login from './components/Login';
import CreateQuiz from './components/CreateQuiz'

function App() {
  return (
    <div id="container">
      <AppNavabr />
      <CreateQuiz />
    </div>
  );
}

export default App;
