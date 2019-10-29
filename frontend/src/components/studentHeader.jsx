import icon from "../Images/v.jpg";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";

class StudentHeader extends React.Component {

    state = {
        redirectLab: false,
        redirectCourse:false
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
    render() {
        return (



            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <i >VirtuLab</i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.renderRedirectCourse()}
                <label onClick={this.setRedirectCourse} >
                    Courses</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.renderRedirectLab()}
                <label onClick={this.setRedirectLab} >
                    Labs</label>
            </div>

        );
    }
}
export default StudentHeader;