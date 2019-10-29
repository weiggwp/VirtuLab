import React, {Component} from 'react';
import icon from "../Images/v.jpg";
import '../stylesheets/banner.css';
import {Button, Image, Nav, Navbar} from "react-bootstrap";

class do_lab extends React.Component {
    constructor(props) {
        super(props);

    }

    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
      )

    }

    toolbar()
    {
        return (
            <Navbar style={{backgroundColor:"lightgray", marginLeft:40,marginRight:40}}  className={"justify-content-between"}>
                <Nav >


                    <Button  style={{backgroundColor:"#e88f65ff"}} >Restart</Button>

                </Nav>

                <Nav >
                    <label className="contain">
                        Show Completed Labs
                        <input type="checkbox"/>
                        <span className="checkmark">

                                        </span>
                    </label>

                    <Image  onClick={this.setRedirectAcct} className={"config_image"} src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded />

                </Nav>

            </Navbar>
        )
    }
    render(){
        return(
            <div>
                {this.banner()}
            </div>
        )
    }


}


export default do_lab;