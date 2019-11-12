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
    renderWorkspace()
    {
        if(this.props.empty)
        {
            return(
                <Navbar style={{backgroundColor:"white",height:"7vh",borderWidth:2,borderStyle:"ridge"}}>

                </Navbar>
            );

        }
        return (
            <Navbar style={{backgroundColor:"white",height:"7vh",borderWidth:2,borderStyle:"ridge"}}>
                <Equipment image={"https://cdn.iconscout.com/icon/premium/png-256-thumb/water-bottle-1738496-1475816.png"}/>
                x2
                <Equipment image={"https://cdn4.iconfinder.com/data/icons/medical-health-10/128/1-512.png"}/>
                x2
                <Equipment image={"https://cdn4.iconfinder.com/data/icons/laboratory-4/58/9-512.png"}/>
                x1
                <Equipment image={"https://cdn0.iconfinder.com/data/icons/mix-object-set/64/Pipet-512.png"}/>
                x1
                {/*https://cdn4.iconfinder.com/data/icons/medical-health-10/128/1-512.png*/}
            </Navbar>
        )
    }



    render() {



    return(

        <div>

            {/*{this.renderWorkspace()}*/}

        </div>
    )

    }
}

export {Workspace};



