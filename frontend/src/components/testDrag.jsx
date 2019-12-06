import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import '../stylesheets/create_lab.css';
import { ReactComponent as Example } from '../Images/water.svg';
import water from '../Images/water.svg';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

let dragSrcEl = null;

class test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            object:undefined,
            target:undefined,
            x:undefined,
            y:undefined

        };

        this.dragStart_handler = this.dragStart_handler.bind(this);
        this.dragEnter_handler = this.dragEnter_handler.bind(this);
        this.dragover_handler = this.dragover_handler.bind(this);
        this.dragLeave_handler = this.dragLeave_handler.bind(this);
        this.drop_handler = this.drop_handler.bind(this);

    }

    dragStart_handler=(ev)=> {
        ev.persist()
        console.log(ev)
        // calculate the offset of the mouse pointer from the left and top of the element and passes it in the dataTransfer
        const style = window.getComputedStyle(ev.target, null);
        // console.log(style.getPropertyValue("left"));
        const left = (parseInt(style.getPropertyValue("left"),10) - ev.clientX);
        const top = (parseInt(style.getPropertyValue("top"),10) - ev.clientY);
        // console.log(left);
        // console.log(top);
        ev.dataTransfer.setData("text/offset", left + ',' + top);
        ev.dataTransfer.setData("text/id", ev.target.id);

        // Add the source element's id to the data transfer object
        ev.dataTransfer.setData("text/workspace_id", this.props.wkspace_id);
        ev.dataTransfer.setData("text/equip_id", this.props.equip_id);
        ev.target.style.opacity = '0.4';
        dragSrcEl = this;
        this.html = ev.target;

        ev.dataTransfer.effectAllowed = 'move';
    };
    dragEnter_handler=(ev)=>{
        if (dragSrcEl !== this) {
            ev.target.style.border = "3px dotted red";
        }
        // ev.target.style.cursor="copy";

    };

    dragLeave_handler(ev){
        // ev.preventDefault();
        ev.target.style.border="";
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


        const workspace_id = ev.dataTransfer.getData('text/workspace_id');
        const equip_id = ev.dataTransfer.getData('text/equip_id');
        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl !== this &&
            this.props.canInteract(workspace_id, equip_id, this.props.wkspace_id, this.props.equip_id,)) {

            // move_element(ev);

            this.props.interation_handler(
                ev.target,
                workspace_id, equip_id,
                this.props.wkspace_id,this.props.equip_id,
            );


        }
        else if (dragSrcEl === this){
            // move_element(ev);
        }
        else{
            alert("Not Interactable!");

        }
        ev.target.style.border="";
        ev.target.style.opacity = '1.0';
        return false;

    }
    handleDragEnd(ev) {
        // e.target is the source node.
        ev.target.style.border="";
        ev.target.style.opacity = '1.0';

    }

    //<object className="emb" data="images/svglogo.svg" width="100" height="100" type="image/svg+xml"></object>


    render() {
        // alert(this.props.equipment.image);
        return (
            <div
                draggable="true"
                onDragStart={this.dragStart_handler}
                onMouseDown={this.dragStart_handler}
                onMouseUp={this.drop_handler}
                onDrop={this.drop_handler}
                onDragOver={this.dragover_handler}
                onDragEnter={this.dragEnter_handler} onDragLeave={this.dragLeave_handler}
                onDragExit={this.dragExit_handler} onDragEnd={this.handleDragEnd}
                style={{position:"absolute",height:200,width:200,display:"inline-block",borderStyle:"dotted"}}

            >

                    <object

                        style={{position:"absolute",height:200,width:200,display:"inline-block"}}
                        data={water}
                        type={"image/svg+xml"}
                    >
                    </object>



            </div>


        )
    }
}

export default test;