import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Equipment} from "./Equipment";

class EquipmentList extends React.Component
    //equipments are draggable
{
    constructor(props)
    {
        super(props);

    }


    render() {

        return(

                <Tabs style={{borderStyle:"solid",justifyContent:'center',alignItems:'center',borderWidth:1,marginTop:10,backgroundColor: '#96E2FA',color:"white",height:"8vh"}} defaultActiveKey="Solutions" transition={false} id="noanim-tab-example">

                    <Tab eventKey="Solutions"
                     title={
                         <div style={{height:"5vh",width:"8vh"}}>  Solutions </div>}>
                    {/*{
                             <div style={{display:"inline-block"}}>  Solutions <img src={solution} className={"images"} /></div>}*/}

                        <div style={{ overflowY: "scroll",height:"30vh"}} >
                             <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>
                                 <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                            <Equipment image={"https://cdn.iconscout.com/icon/premium/png-256-thumb/water-bottle-1738496-1475816.png"}/>
                            Distilled water

                        </Button>



                    </ButtonGroup>
                        </div>
                </Tab>
                <Tab eventKey="Glassware" title={
                    <div style={{height:"5vh",width:"8vh"}}> Glassware </div>} >
                    <div style={{ overflowY: "scroll",height:"30vh"}} >
                    <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>
                        <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                            <Equipment image={"https://cdn4.iconfinder.com/data/icons/medical-health-10/128/1-512.png"}/>
                            Erlenmeyer flask

                        </Button>
                        <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                            <Equipment image={"https://cdn4.iconfinder.com/data/icons/laboratory-4/58/9-512.png"}/>
                            Beaker

                        </Button>
                        <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                            <Equipment image={"https://static.thenounproject.com/png/161931-200.png"}/>
                            Graduated Cylinder

                        </Button>
                    </ButtonGroup>
                    </div>

                </Tab>
                <Tab eventKey="Tools" title={
                    <div style={{height:"5vh",width:"8vh"}}>  Tools</div>} >
                    {/*<Sonnet />*/}
                    <div style={{ overflowY: "scroll",height:"30vh"}} >
                    </div>
                </Tab>
            </Tabs>



        );
    }
}

export {EquipmentList};



