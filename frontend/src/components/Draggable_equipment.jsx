import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import '../stylesheets/create_lab.css';

var dragSrcEl = null;
class Draggable_equipment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            object:undefined,
            target:undefined,

        }

        this.dragStart_handler = this.dragStart_handler.bind(this);
        this.dragEnter_handler = this.dragEnter_handler.bind(this);
        this.dragover_handler = this.dragover_handler.bind(this);
        this.dragLeave_handler = this.dragLeave_handler.bind(this);
        this.drop_handler = this.drop_handler.bind(this);

    }
    onStop = (event) => {
        event.preventDefault()
        // event.state.target.style.opacity="0.6";
        this.state.object.style.opacity="1";
        this.state.object.style.border="0px";
        this.state.object.style.cursor="default";
        // if(event.state.target!==this.state.object) {
        //
        //     this.state.target.style.cursor="default";
        //
        // }


        // console.log(event)
        // if(event!==this.state.object)
        // {
        //     this.state.target = event;
        //     this.state.target.style.border="0px";
        // }



    };
    dragEnter=(event)=>{
        // alert("entering")

        console.log("entering")
        event.state.target.style.border = "3px dotted red";
        event.state.target.style.cursor="copy";

        // css('cursor','copy');
        // this.state.object.classList.add("pop")



    }
    handleDrag = (e, ui) => {
        // const {x, y} = this.state.deltaPosition;
        // this.setState({
        //     deltaPosition: {
        //         x: x + ui.deltaX,
        //         y: y + ui.deltaY,
        //     }
        // });

        if(ui.node!==e.state.target)
        {
            console.log(ui.node);
            console.log(e.state.target);
        }


    };
    onDrag=(event)=>{
        event.preventDefault();

        // console.log(this.state.object===event.state.target);

        //if moved on top of another equipment should give some feedback
        //plus sign perhaps
        // console.log(event.state.target+"dragging"+event.state.target.className)



        if(event.state.target!==this.state.object && event.state.target.classList.contains("react-draggable"))
        {
            // console.log("dragging and checking classList")
            //
            // console.log(event.state.target.classList)

            event.state.target.style.border = "3px dotted red";
            event.state.target.style.opacity ="0.5";


            this.state.target = event.state.target;
            this.state.object.style.cursor="copy";
            this.state.target.style.cursor="copy";

            // this.setState(
            //     {
            //         target:event
            //     }
            // )
        }
        else
        {
        }




    }
    onStart=(event)=>{
        event.preventDefault()

        event.state.target.style.opacity="0.5";
        event.state.target.classname="pop";

        console.log("start dragging"+event.state.target)
        this.state.object = event.state.target;
        this.state.object.style.zIndex=2;
        //setting z index
        // this.setState(
        //     {
        //         object:event
        //     }
        // )


    }
    onLeave=(event)=>{

        event.state.target.style.opacity="1";
        event.state.target.style.border="0px";
    }



    // dragstart_handler(ev) {
    //     // Add the target element's id to the data transfer object
    //
    //     console.log(ev.target);
    //     ev.dataTransfer.setData("text/plain", ev.target);
    //     ev.dataTransfer.dropEffect = "move";
    // }
    // dragover_handler(ev) {
    //     ev.preventDefault();
    //     ev.dataTransfer.dropEffect = "move";
    // }
    // drop_handler(ev) {
    //     ev.preventDefault();
    //     // Get the id of the target and add the moved element to the target's DOM
    //     // var data = ev.dataTransfer.getData("text/plain");
    //     // ev.target.appendChild(document.getElementById(data));
    // }

     dragStart_handler=(ev)=> {
        // Add the target element's id to the data transfer object
         ev.dataTransfer.setData("text/workspace_id", this.props.wkspace_id);
         ev.dataTransfer.setData("text/equip_id", this.props.equip_id);
        ev.target.style.opacity = '0.4';
        dragSrcEl = this;
        this.html = ev.target;

        ev.dataTransfer.effectAllowed = 'move';
    }
    dragEnter_handler=(ev)=>{
        ev.target.style.border = "3px dotted red";
    };

    dragLeave_handler(ev){
        // ev.preventDefault();
        ev.target.style.border="";

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
         // Don't do anything if dropping the same column we're dragging.
         if (dragSrcEl !== this) {
             // Set the source column's HTML to the HTML of the column we dropped on.
             dragSrcEl.innerHTML = this.innerHTML;
             const workspace_id = ev.dataTransfer.getData('text/workspace_id');
             const equip_id = ev.dataTransfer.getData('text/equip_id');
             this.props.interation_handler(
                 workspace_id, equip_id,
                 this.props.wkspace_id,this.props.equip_id,
                 );
             // alert("droppppp dat shirttttt");
         }

         ev.target.style.border="";
         ev.target.style.opacity = '1.0';
         return false;
     }
     handleDragEnd(e) {
        // this/e.target is the source node.

        // [].forEach.call(cols, function (col) {
        //     col.classList.remove('over');
        // });

    }


//                defaultPosition={{x:this.props.x,y:this.props.y}}>

    render() {
        return (
            //
            // <div>
            //     <p id = "p1" draggable = "true" onDragStart ={this.dragstart_handler} >
            //         This element is draggable. </p>
            //     <div id="target" onDrop={this.drop_handler} onDragEnter={this.dragover_handler}>Drop Zone</div>
            // </div>


            <img id={"workspace"+this.props.wkspace_id+"equip"+this.props.equip_id}
                 draggable="true"
                 onDragStart={this.dragStart_handler}
                 onDrop={this.drop_handler}
                 onDragOver={this.dragover_handler}
                 onDragEnter={this.dragEnter_handler} onDragLeave={this.dragLeave_handler}
                 onDragExit={this.dragExit_handler}
                 src={this.props.image}
                 style={{paddingBottom:20,display:"inline-block",width: this.props.width,height: this.props.height}}/>

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