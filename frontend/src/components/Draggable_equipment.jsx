import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import '../stylesheets/create_lab.css';
import {move_element} from "./create_lab"
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import {ReactSVG} from 'react-svg'
import {css} from 'glamor'
import Water from "./water";

let dragSrcEl = null;

class Draggable_equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object: undefined,
            target: undefined,

        };

        this.dragStart_handler = this.dragStart_handler.bind(this);
        this.dragEnter_handler = this.dragEnter_handler.bind(this);
        this.dragover_handler = this.dragover_handler.bind(this);
        this.dragLeave_handler = this.dragLeave_handler.bind(this);
        this.drop_handler = this.drop_handler.bind(this);

    }

    dragStart_handler = (ev) => {
        // calculate the offset of the mouse pointer from the left and top of the element and passes it in the dataTransfer
        const style = window.getComputedStyle(ev.target, null);
        // console.log(style.getPropertyValue("left"));
        const left = (parseInt(style.getPropertyValue("left"), 10) - ev.clientX);
        const top = (parseInt(style.getPropertyValue("top"), 10) - ev.clientY);
        console.log(left);

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
    dragEnter_handler = (ev) => {
        if (dragSrcEl !== this) {
            ev.target.style.border = "3px dotted red";
        }
        // ev.target.style.cursor="copy";

    };

    dragLeave_handler(ev) {
        // ev.preventDefault();
        ev.target.style.border = "";
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

            move_element(ev);

            this.props.interation_handler(
                ev.target,
                workspace_id, equip_id,
                this.props.wkspace_id, this.props.equip_id,
            );


        } else if (dragSrcEl === this) {
            move_element(ev);
        } else {
            alert("Not Interactable!");

        }
        ev.target.style.border = "";
        ev.target.style.opacity = '1.0';
        return false;

    }

    handleDragEnd(ev) {
        // e.target is the source node.
        ev.target.style.border = "";
        ev.target.style.opacity = '1.0';

    }


    render() {
        const styles = css({
            ' svg': {
                height: 200,
                width: 200,
                fill: 'blue',
            },
            // ' rect': {
            //     fill: 'aqua',
            //     height: 190,
            //     stroke: 'darkmagenta',
            //     width: 190
            // }
        })
        // const water = new Water();
        return (
            <div>

                <ContextMenuTrigger id={"trigger" + this.props.wkspace_id + "," + this.props.equip_id}
                                    holdToDisplay={-1}>
                    {/*<div className="well">Right click to see the menu</div>*/}
                    {/*<img id={"workspace"+this.props.wkspace_id+"equip"+this.props.equip_id}*/}
                    {/*     draggable="true"*/}
                    {/*     onDragStart={this.dragStart_handler}*/}
                    {/*     onDrop={this.drop_handler}*/}
                    {/*     onDragOver={this.dragover_handler}*/}
                    {/*     onDragEnter={this.dragEnter_handler} onDragLeave={this.dragLeave_handler}*/}
                    {/*     onDragExit={this.dragExit_handler} onDragEnd={this.handleDragEnd}*/}
                    {/*     src={this.props.equipment.image}*/}
                    {/*     style={{position:"absolute",left:this.props.equipment.left,top:this.props.equipment.top,paddingBottom:20,display:"inline-block",width: this.props.width,height: this.props.height}}*/}
                    {/*     alt={"Not Found"}/>*/}
                    <div id={"workspace"+this.props.wkspace_id+"equip"+this.props.equip_id}
                        draggable="true"
                         onDragStart={this.dragStart_handler}
                         onDrop={this.drop_handler}
                         onDragOver={this.dragover_handler}
                         onDragEnter={this.dragEnter_handler} onDragLeave={this.dragLeave_handler}
                         onDragExit={this.dragExit_handler} onDragEnd={this.handleDragEnd}
                         style={{position:"absolute",
                             left:this.props.equipment.left,
                             top:this.props.equipment.top,
                             width: this.props.width,
                             height: this.props.height}}

                    >
                        <this.props.equipment.svg fill_percent={this.props.equipment.getFillPercent()}/>


                    </div>
                    {/*<ReactSVG*/}
                    {/*    draggable="true"*/}
                    {/*    onDragStart={this.dragStart_handler}*/}
                    {/*    onDrop={this.drop_handler}*/}
                    {/*    onDragOver={this.dragover_handler}*/}
                    {/*    onDragEnter={this.dragEnter_handler} onDragLeave={this.dragLeave_handler}*/}
                    {/*    onDragExit={this.dragExit_handler} onDragEnd={this.handleDragEnd}*/}
                    {/*    src={this.props.equipment.image}*/}
                    {/*   {...styles}*/}
                    {/*    */}
                    {/*/>*/}
                </ContextMenuTrigger>

                <ContextMenu id={"trigger" + this.props.wkspace_id + "," + this.props.equip_id}>
                    <MenuItem data={{workspace_id: this.props.wkspace_id, equip_id: this.props.equip_id}}
                              onClick={this.props.handle_equip_delete}>
                        Delete
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Remove Containing Elements
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        View Info
                    </MenuItem>
                </ContextMenu>

            </div>

            // <Draggable
            //     onDragEnter={this.dragEnter}
            //     onDragLeave={this.onLeave}
            //     onStart={this.onStart}
            //     onStop={this.onStop}
            //     onDrag={this.onDrag}
            //     bounds="parent"
            //     >
            //     {/*<div id={this.props.width*this.props.height} style={{display:"inline-block",width: this.props.width,height: this.props.height}}>*/}
            //
            //     <img id="layout" draggable="false" src={this.props.image} style={{paddingBottom:20,display:"inline-block",width: this.props.width,height: this.props.height}}/>
            //         {/*<div>drag me</div>*/}
            //     {/*</div>*/}
            //
            //
            // </Draggable>

        )
    }
}

export {Draggable_equipment}