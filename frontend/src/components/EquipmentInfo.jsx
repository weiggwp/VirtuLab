import React from 'react'
import {Image, Nav} from "react-bootstrap";
import more from "../Images/more1.png";
import Accordion from "react-bootstrap/Accordion";
import '../stylesheets/Equipments.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import StickyHeadTable from "../Table.js";


class EquipmentInfo extends React.Component{


    constructor(props)
    {
        super(props);

        this.state ={


        }
    }
    createTableData() {

        const equipment = this.props.equipment;
        const name = equipment.name;
        const result=[];

        if(equipment.type==="Solution")
        {
            const amount = equipment.amount;
            console.log(name+amount);


            return [{name,amount}]
        }
        else
        {
            const items=equipment.items;

            var element;
            for (element = 0; element < items.length; element++) {

                const name = items[element].name;
                const amount= items[element].amount;

                result.push({ name,amount })

            }

            return result;

        }
    }



    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Elements' },
        { id: 'amount', numeric: true, disablePadding: false, label: 'amount (mL)' },

    ];

    render()
    {
        // const equipment = this.props.equipment;
        return (
            <div>

            <div className={"rowTab"} onClick={this.props.getEquipments} style={{cursor:"pointer"}}>

                <div className={"column1 "}>Equipment Room</div>
                <img  className={"column2"} src={more} />

            </div>
                <div className={"rowTab"}>

                    <div >Information</div>


                </div>
                <div className={"informationPane"}>
                    <span>Name: {this.props.equipment.name} <br/></span>
                    <span>Volume: {this.props.equipment.amount} mL</span>
                    <div style={{marginTop:10}}>

                        <StickyHeadTable rows={this.createTableData()} columns={this.headCells}/>

                    </div>
                </div>


            </div>
        )
    }
}

export {EquipmentInfo}



