import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import '../stylesheets/create_lab.css';
import flask from "../Images/250mLFlask.svg";
import beaker from "../Images/250mLBeaker.svg";

class test_draggable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            object:undefined,
            target:undefined,

        }
    }
    onStop = (event) => {
        event.preventDefault()
        // event.target.style.opacity="0.6";
        this.object.style.opacity="1";
        this.object.style.border="0px";
        this.object.style.cursor="default";
        // if(event.target!==this.object) {
        //
        //     this.target.style.cursor="default";
        //
        // }


        // console.log(event)
        // if(event!==this.object)
        // {
        //     this.target = event;
        //     this.target.style.border="0px";
        // }



    };
    dragEnter=(event)=>{
        // alert("entering")

        event.target.style.border = "3px dotted red";
        event.target.style.cursor="copy";

        // css('cursor','copy');
        // this.object.classList.add("pop")



    }
    handleDrag = (e, ui) => {
        // const {x, y} = this.state.deltaPosition;
        // this.setState({
        //     deltaPosition: {
        //         x: x + ui.deltaX,
        //         y: y + ui.deltaY,
        //     }
        // });

        if(ui.node!==e.target)
        {
        }


    };
    onDrag=(event)=>{
        event.preventDefault()

        // console.log(this.object===event.target);

        //if moved on top of another equipment should give some feedback
        //plus sign perhaps
        // console.log(event.target+"dragging"+event.target.className)



        if(event.target!==this.object && event.target.classList.contains("react-draggable"))
        {
            // console.log("dragging and checking classList")
            //
            // console.log(event.target.classList)

            event.target.style.border = "3px dotted red";
            event.target.style.opacity ="0.5"


            this.target = event.target;
            this.object.style.cursor="copy";
            this.target.style.cursor="copy";

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

        event.target.style.opacity="0.5";
        event.target.classname="pop";

        this.object = event.target;
        this.object.style.zIndex=2;
        //setting z index
        // this.setState(
        //     {
        //         object:event
        //     }
        // )


    }
    onLeave=(event)=>{

        event.target.style.opacity="1";
        event.target.style.border="0px";
    }
    onDragOver=(event)=>{

        alert("dragging over")
    }

//                defaultPosition={{x:this.props.x,y:this.props.y}}>


    render() {
        return (
            <div style={{height:1000}}>
            <Draggable
                onDragEnter={this.dragEnter}
                onDragLeave={this.onLeave}
                onStart={this.onStart}
                onStop={this.onStop}
                onDrag={this.onDrag}
                bounds="parent"
            >
                {/*<div id={this.props.width*this.props.height} style={{display:"inline-block",width: this.props.width,height: this.props.height}}>*/}

                <img id="layout" draggable="false" src={beaker} style={{paddingBottom:20,display:"inline-block",width: 100,height: 100}}/>
                {/*<div>drag me</div>*/}
                {/*</div>*/}


            </Draggable>
                <Draggable
                    onDragEnter={this.dragEnter}
                    onDragLeave={this.onLeave}
                    onStart={this.onStart}
                    onStop={this.onStop}
                    onDrag={this.onDrag}
                    bounds="parent"
                >
                    {/*<div id={this.props.width*this.props.height} style={{display:"inline-block",width: this.props.width,height: this.props.height}}>*/}

                    <img id="layout" draggable="false" src={flask} style={{paddingBottom:20,display:"inline-block",width: 100,height: 100}}/>
                    {/*<div>drag me</div>*/}
                    {/*</div>*/}


                </Draggable>
            </div>


        )
    }
}

export default test_draggable