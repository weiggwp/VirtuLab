import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import '../stylesheets/create_lab.css';
import GetSVG from "../NameToSVGMappings.js";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {ToastsStore} from "react-toasts";
import {ColorPicker} from "./ColorPicker";
import {empty} from "glamor";
import Tool from "../Tool";

let dragSrcEl = null;
let counter =0;
class Draggable_equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eq: props.equipment,
            object: undefined,
            target: undefined,
            x:undefined,
            y:undefined,
            color:props.equipment.color,
            rotate:0,

        };

        this.dragStart_handler = this.dragStart_handler.bind(this);
        this.dragEnter_handler = this.dragEnter_handler.bind(this);
        this.dragover_handler = this.dragover_handler.bind(this);
        this.dragLeave_handler = this.dragLeave_handler.bind(this);
        this.drop_handler = this.drop_handler.bind(this);
        this.setColor = this.setColor.bind(this);

    }

    setColor=(color)=>
    {
        this.setState({ color: color });
        this.props.equipment.color=color;
        // this.props.addColorChangeRule(this.props.equipment, color);
    };

    getColor()
    {
        return this.state.color;

    }


    dragStart_handler = (ev) => {
        // calculate the offset of the mouse pointer from the left and top of the element and passes it in the dataTransfer
        const style = window.getComputedStyle(ev.target, null);
        this.props.hide();
        // console.log(style.getPropertyValue("left"));
        const left = (parseInt(style.getPropertyValue("left"), 10) - ev.clientX);
        const top = (parseInt(style.getPropertyValue("top"), 10) - ev.clientY);

        ev.dataTransfer.setData("text/offset", left + ',' + top);
        ev.dataTransfer.setData("text/id", ev.target.id);

        // Add the source element's id to the data transfer object
        ev.dataTransfer.setData("text/workspace_id", this.props.wkspace_id);
        ev.dataTransfer.setData("text/equip_id", this.props.equip_id);
        ev.target.style.opacity = '0.4';
        dragSrcEl = this;
        this.html = ev.target;

        //pop off old equip
        const key = this.props.wkspace_id +","+this.props.equip_id;
        if(key in this.props.interaction_map){
            // console.log("eq was interacting");
            this.props.popOff( this.props.wkspace_id, this.props.equip_id);
        }

        ev.dataTransfer.effectAllowed = 'move';
    };
    dragEnter_handler = (ev) => {
        ev.preventDefault();
        counter++;
        if (dragSrcEl !== this) {
            const dm = document.getElementById("workspace"+this.props.wkspace_id+"equip"+this.props.equip_id);
            dm.style.border = "3px dotted red";
        }
        // ev.target.style.cursor="copy";

    };

    dragLeave_handler(ev) {
        ev.preventDefault();
        ev.persist();
        // console.log("leaving",ev)
        counter--;
        if(counter===0){
            const dm = document.getElementById("workspace"+this.props.wkspace_id+"equip"+this.props.equip_id);
            dm.style.border = "";
        }
        // ev.target.style.cursor="";
    }

    dragover_handler(ev) {
        if (ev.preventDefault) {
            ev.preventDefault(); // Necessary. Allows us to drop.
        }
        ev.dataTransfer.dropEffect = "move";
        return false;

    }

    dragExit_handler(ev) {
        ev.preventDefault();

    }

    drop_handler(ev) {
        // ev.preventDefault();
        if (ev.stopPropagation) {
            ev.stopPropagation(); // Stops some browsers from redirecting.
        }
        counter=0;
        const dm = document.getElementById("workspace"+this.props.wkspace_id+"equip"+this.props.equip_id);
        // console.log(dm);
        dm.style.border = "";
        dm.style.opacity = '1.0';
        //ev is target
        const workspace_id = ev.dataTransfer.getData('text/workspace_id');
        const equip_id = ev.dataTransfer.getData('text/equip_id');
        // Don't do anything if dropping the same column we're dragging.
        //dragSrcEl is equipment.js source object
        if (dragSrcEl !== this &&
            this.props.canInteract(workspace_id, equip_id, this.props.wkspace_id, this.props.equip_id,)) {
            //first src, second target


            // this.props.move_element(ev);
            this.props.adjust(ev,workspace_id,equip_id,this.props.equip_id);

            this.props.interation_handler(
                ev.target,
                workspace_id, equip_id,
                this.props.wkspace_id, this.props.equip_id,
            );


        }
        else if (dragSrcEl === this){
            // console.log(ev)
            const offset = ev.dataTransfer.getData("text/offset").split(',');
            // console.log("offset",offset)
            //can drop on top of itself but within bounds
            const x = ev.clientX + parseInt(offset[0],10);
            const y = ev.clientY + parseInt(offset[1],10);
            // console.log("moving myself to ",x,y)
            if(x>=0 && y>=0)
                this.props.move_element(ev);
            else
            {
                dm.style.left = '0 px';
                dm.style.top = '0 px';
            }
        }
        else{
            ToastsStore.error("Not interactable")

        }

        return false;

    }

    handleDragEnd(ev) {
        // e.target is the source node.
        ev.target.style.border = "";
        ev.target.style.opacity = '1.0';

    }

    getDisplay(top,equip)
    {

        const styles = {
            display:'none'
        }
        if(Tool.prototype.isPrototypeOf(equip))
        {

            return styles

        }
        const emptyStyles={}
        if(top)
        {

            if(equip.interacting)
                return emptyStyles;
            return styles;
        }
        else
        {
            if(equip.interacting)
                return styles;
            return emptyStyles;

        }


    }

    getInfo(equipment,string)
    {
        if(Tool.prototype.isPrototypeOf(equipment))
        {

            return " "

        }
        return string
    }





    render() {
        const equip = this.props.equipment;
        const top = this.getDisplay(true,equip);
        const bot = this.getDisplay(false,equip);
        var draggable=this.props.draggable;

        if(draggable===undefined)
            draggable="true"
        // console.log(top,bot)
        var colorPicker=null;

        const id = "workspace"+this.props.wkspace_id+"equip"+this.props.equip_id;
        const disable=!draggable;

        if (this.props.role==undefined||this.props.role==null||this.props.role!="student"){
            colorPicker=
                <div disabled={disable} style={{width:"100%"}}>
                    <ColorPicker setColor={this.setColor}/>
                </div>
        }
        return (
            <div>
                <ContextMenuTrigger id={"trigger" + this.props.wkspace_id + "," + this.props.equip_id}
                                    holdToDisplay={-1}>


                    <div id={id}
                         className={"workspace_equip"}
                         draggable={draggable}
                         onDragStart={this.dragStart_handler}
                         onDrop={this.drop_handler}
                         onDragOver={this.dragover_handler}
                         onDragEnter={this.dragEnter_handler} onDragLeave={this.dragLeave_handler}
                         onDragExit={this.dragExit_handler} onDragEnd={this.handleDragEnd}
                         style={{position:"absolute",
                             left:equip.left,
                             top:equip.top,
                         }}
                    >

                        <div className={"info"} style={top}>
                            <p className="infoName" >{this.getInfo(this.props.equipment,this.props.equipment.toString())}</p>
                            <p className="infoState" >{this.getInfo(this.props.equipment,this.props.equipment.toStateString())}</p>
                        </div>

                        <GetSVG
                                equip={this.props.equipment}
                                name={this.props.equipment.name}
                                type={this.props.equipment.type}
                                fill={this.getColor()}
                                size={equip.size}
                                onDrop={this.drop_handler}
                                id={id}
                        />

                        <div className={"info"} style={bot}>
                            <p className="infoName" >{this.getInfo(this.props.equipment,this.props.equipment.toString())}</p>
                            <p className="infoState" >{this.getInfo(this.props.equipment,this.props.equipment.toStateString())}</p>
                        </div>

                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={"trigger" + this.props.wkspace_id + "," + this.props.equip_id}>


                    {colorPicker}
                    <MenuItem disabled={disable} data={{workspace_id: this.props.wkspace_id, equip_id: this.props.equip_id}}
                              onClick={this.props.handle_equip_delete}>
                        Delete
                    </MenuItem>

                    <MenuItem disabled={disable} data={{foo: 'bar'}} onClick={this.handleClick}>
                        Remove Containing Elements
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem data={{workspace_id: this.props.wkspace_id, equip_id: this.props.equip_id}} onClick={this.props.viewInfo}>
                        View Info
                    </MenuItem>
                </ContextMenu>
            </div>

        )
    }
}

export {Draggable_equipment}