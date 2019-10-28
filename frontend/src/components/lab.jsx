import React from 'react';
import {Button, Col, Row} from "react-bootstrap";

class Lab extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state= {
            completed : false,
            showCompleted : false,  //if true, show full list
            labNum :0,
            name : '',
            due : Date,



        }
    }
    render() {
        return(

            <div>

            </div>
        );
    }
}

return {Lab}