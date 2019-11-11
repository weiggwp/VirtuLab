import icon from "../Images/v.jpg";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {Button} from "react-bootstrap";

class InstructorHeader extends React.Component {

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
            return <Redirect to='/instructor_labs' />
        }
    }

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

    renderLabButton =(currentTab) =>{
        if( currentTab ==="Labs") {
            return (

                <Button onClick={this.setRedirectLab} >
                    Labs
                </Button>

            );
        }
        else{
            return (

                <Button onClick={this.setRedirectLab} className="lowlight">
                    Labs
                </Button>
            )
        }
    };

    render() {
        return (

            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <i >VirtuLab</i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.renderRedirectCourse()}
                {this.renderCourseButton(this.props.currentTab)}
                {/*<label onClick={this.setRedirectCourse} className="highlight">*/}
                {/*    Courses</label>*/}
                &nbsp;&nbsp;&nbsp;
                {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                {this.renderRedirectLab()}
                {this.renderLabButton(this.props.currentTab)}
                {/*<label onClick={this.setRedirectLab} >*/}
                {/*    Labs</label>*/}
            </div>

        );
    }
}
export default InstructorHeader;