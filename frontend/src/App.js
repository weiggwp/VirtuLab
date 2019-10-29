import React, { Component } from 'react';
import logo from './logo.svg';
import './stylesheets/App.css';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import Account from './components/account_settings.jsx';
import StudentHome from './components/student_home.jsx';
import DoLab from './components/student_lab.jsx';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/account_settings" component={Account} />
              <Route exact path="/student_home" component={StudentHome} />
              <Route exact path="/do_lab" component={DoLab} />

            </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
/*
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/games" component={Games} />
              <Route exact path="/replay/:id" component={Replay}/>
              <Route component={NoMatch} />
 */

//TODO:need to implement PrivateRoute