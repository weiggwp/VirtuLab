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
import CreateLab from './components/create_lab.jsx';
import Statistics from './components/Statistics.jsx';
import test_draggable from './components/test_draggable.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/test" component={test_draggable} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/account_settings" component={Account} />
                <PrivateRoute exact path="/student_home" role="student" component={StudentHome}/>
                <PrivateRoute exact path="/instructor_home" role="instructor" component={InstructorHome}/>
                <PrivateRoute exact path="/instructor_labs" role="instructor" component={InstructorLabs}/>
                <PrivateRoute exact path="/public_labs" role="instructor" component={PublicLab}/>
                <PrivateRoute exact path="/create_course" role="instructor" component={CreateCourse}/>
              <PrivateRoute exact path="/do_lab" role="student" component={DoLab} />
              <PrivateRoute exact path="/create_lab" role="instructor" component={CreateLab} />
              <PrivateRoute exact path="/statistics" role="instructor" component={Statistics} />

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
