import icon from "../Images/v.jpg";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {Button} from "react-bootstrap";
import '../stylesheets/banner.css';

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



    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }

    handleLogout = (e) => {
        this.setState({
            loggedOut:true
        });
        localStorage.clear();//clear tokens


    };

    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }
    renderRedirectCourse = () => {
        if (this.state.redirectCourse) {
            return <Redirect to='/instructor_home' />
        }
    }
    renderCourseButton =(currentTab) =>{
        if( currentTab==="Courses") {
            return (

                <Button onClick={this.setRedirectCourse} >
                    Courses
                </Button>

            );
        }
        else{
            return (

                <Button onClick={this.setRedirectCourse} className="lowlight" >
                    Courses
                </Button>
            )
        }
    };


    renderLogoutButton()
    {
        return(

            <Button
                onClick={this.handleLogout}
                className={"logout"}>
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

            <div className="banner" style={{paddingBottom:10}}>

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <i >VirtuLab</i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.renderRedirectCourse()}
                {/*{this.renderCourseButton(this.props.currentTab)}*/}

                &nbsp;&nbsp;&nbsp;
                {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                {/*{this.renderRedirectLab()}*/}
                {/*{this.renderLabButton(this.props.currentTab)}*/}
                {this.renderLogoutButton()}

                {/*<label onClick={this.setRedirectLab} >*/}
                {/*    Labs</label>*/}
            </div>

        );
    }
}
export default StudentHeader;