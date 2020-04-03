import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavabr from './components/AppNavbar';
import Login from './components/Login';
import { Route, Switch, withRouter, useParams,Redirect } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import LoginNew from './components/invite/LoginNew'
import GetQuizAns from './components/invite/GetQuizAns';
import Dashboard from './components/dashboard';
import YourResult from './components/yourResult';

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
      userId: userdata.user._id,
      username: userdata.user.username,
      email: userdata.user.email,
      newU: userdata.newU
    });
    if(this.state.userId)
    {
      var localUser = userdata.user;
      localStorage.setItem('user', JSON.stringify(localUser));
      this.props.history.push(`/form`);
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
          <Route exact path="/user/share/:id" component={Dashboard} />
          <Route exact path="/invite/results/:uid/:fid/:iid" component={YourResult} />
          <Route path='*'/>
          <Redirect from='*' to='/' />
       </div>
     </Switch>
    )
  }
}

export default withRouter(App);

