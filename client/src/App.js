import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavabr from './components/AppNavbar';
import Login from './components/Login';
import { Route, Switch, withRouter, useParams } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import LoginNew from './components/invite/LoginNew'
import GetQuizAns from './components/invite/GetQuizAns';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: null,
      email: null,
      newU: null
    }
  }
  getId(userdata)
  {
    // console.log(id)
    this.setState({
      userId: userdata.id,
      username: userdata.username,
      email: userdata.email,
      newU: userdata.newU
    });
    if(this.state.userId)
    {
      const user = {
        name: this.state.username,
        id: this.state.userId,
        email: this.state.email
      }

      localStorage.setItem('user', JSON.stringify(user));
      if(this.state.newU)
        this.props.history.push(`/form`);
      else  
        this.props.history.push(`/form/${this.state.userId}`)
    }

  }

  LoginPage = (props) => {
    return (
      <Login 
      sendId={this.getId.bind(this)}
    />
    )
  }

  CreateQuizPage = (props) => {
    const user = {
      name: this.state.username,
      id: this.state.userId
    }
    return (
      <CreateQuiz
        user={user} 
      />
    )
  }

  LoginNewPage = (props) => {
    let { id } = useParams();
    if (id)
      localStorage.setItem('refId', JSON.stringify(id));
    return (
      <LoginNew />
    )
  }

  render() {
    return (
      <Switch>
        <div id="container">
          <AppNavabr />
          <Route exact path="/" component={this.LoginPage} />
          <Route exact path="/form" component={this.CreateQuizPage} />
          <Route exact path="/invite/:id" component={this.LoginNewPage} />
          <Route exact path="/invite/form/:uid/:fid" component={GetQuizAns} />
       </div>
     </Switch>
    )
  }
}

export default withRouter(App);

