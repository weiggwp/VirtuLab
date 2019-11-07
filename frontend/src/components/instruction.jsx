import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

class Instruction extends React.Component
{
    constructor(props)
    {
        super(props);

    }



    render() {

        return(
            <div style={{ paddingTop:10,paddingLeft:3}}>

            <Card style={{ width: '20rem',height:'30vh'}}>
            <Card.Header>STEP 1:</Card.Header>
            <Card.Body style={{overflowY: "scroll",height:"3vh"}}>
                {/*<Card.Title>Special title treatment</Card.Title>*/}
                <Card.Text style={{textAlign:"left"}}>
                    Click and place the water bottle in the workspace area, then press finish.
                    <br/>Note: This is only here for demo purposes
                </Card.Text>
            </Card.Body>
        </Card>
                <div style={{ paddingTop:20,paddingLeft:3}}>
                {/*<Button disabled style={{ backgroundColor: 'transparent',color:"black"}} block bsSize="large" >*/}
                {/*    Next*/}
                {/*</Button>*/}
                <Button style={{ backgroundColor: 'transparent',color:"black"}} block bsSize="large" >
                    Finish
                </Button>
                </div>
            </div>

        );
    }
}

export {Instruction};



