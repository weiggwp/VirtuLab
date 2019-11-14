import icon from "../Images/v.jpg";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {Button} from "react-bootstrap";

class StudentHeader extends React.Component {

    state = {
        redirectLab: false,
        redirectCourse:false,
        loggedOut: false
    }
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
    }
    renderRedirectLab = () => {
        if (this.state.redirectLab) {
            return <Redirect to='/student_lab' />
        }
    }

    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }
    renderRedirectCourse = () => {
        if (this.state.redirectCourse) {
            return <Redirect to='/student_home' />
        }
    }
    handleLogout = (e) => {
        this.setState({
            loggedOut:true
        });
        localStorage.clear();//clear tokens


    };


    renderLogoutButton()
    {
        return(

            <Button style={{backgroundColor: "white", color: "black", float:"right"}}
                    onClick={this.handleLogout}>
                Logout
            </Button>
        );
    }

    render() {
        if(this.state.loggedOut)
        {
            return <Redirect to='/login'/>
        }
        return (



            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <i >VirtuLab</i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.renderLogoutButton()}
            </div>

        );
    }
}
export default StudentHeader;