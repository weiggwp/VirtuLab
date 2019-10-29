import React, { Component } from 'react';
import './stylesheets/App.css';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import Account from './components/account_settings.jsx';
import StudentHome from './components/student_home.jsx';
import InstructorHome from './components/instructor_home.jsx';
import InstructorLabs from './components/instructor_labs.jsx';
import PublicLab from './components/public_labs.jsx';
import CreateCourse from './components/create_course.jsx';
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
                <Route exact path="/student_home" component={StudentHome}/>
                <Route exact path="/instructor_home" component={InstructorHome}/>
                <Route exact path="/instructor_labs" component={InstructorLabs}/>
                <Route exact path="/public_labs" component={PublicLab}/>
                <Route exact path="/create_course" component={CreateCourse}/>
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