import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import {Equipment} from "./Equipment";
import Navbar from "react-bootstrap/Navbar";


class Workspace extends React.Component
    //equipments are draggable
{
    constructor(props)
    {
        super(props);

    }



    render() {

        return(
            <Navbar style={{backgroundColor:"white",height:"7vh"}}>
                <Equipment/>

            </Navbar>

        );
    }
}

export {Workspace};



