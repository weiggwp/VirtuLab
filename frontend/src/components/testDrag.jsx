import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import reactCSS from 'reactcss'
import '../stylesheets/create_lab.css';
import { ReactComponent as Example } from '../Images/water.svg';
import { useEffect, useState, useRef } from 'react';

import ProgressBar from "react-bootstrap/ProgressBar";

import { Line } from 'rc-progress';

class Drag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 1
        };
        this.t = undefined;
        this.start = this.props.capacity;
        this.capacity=this.props.capacity;
        this.capacitySet=false;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.repeat = this.repeat.bind(this);
        this.zoom = this.zoom.bind(this);

        // this.onMouseUp = this.onMouseUp.bind(this)
        this.zoomOut = this.zoomOut.bind(this);
        this.zoomOutRepeat = this.zoomOutRepeat.bind(this);
        this.zoomOutDown = this.zoomOutDown.bind(this);

        this.zoomOutBig=this.zoomOutBig.bind(this);
        this.zoomOutRepeatBig = this.zoomOutRepeatBig.bind(this);
        this.zoomOutDownBig = this.zoomOutDownBig.bind(this);

        this.onMouseUp = this.onMouseUp.bind(this);
    }

    // ZOOM IN
    onMouseDown() {

        this.repeat();
    }

    repeat() {
        this.zoom();
        this.t = setTimeout(this.repeat, this.start);
        this.start = this.start / 2;
    }

    zoom() {
        if(this.state.zoom>=this.state.capacity)
            return
        let incValue=.2;
        if (this.props.incValue!=undefined){
            incValue=this.props.incValue;
        }
        this.setState({ zoom: Math.round((this.state.zoom + incValue)*this.capacity)/this.capacity },()=>{
            this.props.handleChange(this.state.zoom)
        });

    }

    // ZOOM OUT

    zoomOut() {
        if(this.state.zoom<=0)
            return
        let incValue=.2;
        this.setState({ zoom: Math.round((this.state.zoom - incValue)*this.capacity)/this.capacity },()=>{
            this.props.handleChange(this.state.zoom)
        });
    }

    zoomOutRepeat() {
        this.zoomOut();
       // this.t = setTimeout(this.zoomOutRepeat, this.start);
        //this.start = this.start / 2;
    }

    zoomOutDown(e) {
        e.preventDefault();
        this.zoomOutRepeat();

    }
    zoomOutDownBig(e) {
        e.preventDefault();
        this.zoomOutRepeatBig();

    }
    zoomOutRepeatBig() {
        this.zoomOutBig();
        // this.t = setTimeout(this.zoomOutRepeat, this.start);
        //this.start = this.start / 2;
    }
    zoomOutBig() {
        if(this.state.zoom<=0)
            return
        let incValue=2;
        this.setState({ zoom: Math.round((this.state.zoom - incValue)*this.capacity)/this.capacity },()=>{
            this.props.handleChange(this.state.zoom)
        });
    }
    // STOP ZOOMING
    onMouseUp() {

        clearTimeout(this.t);
        this.start = this.capacity
    }

    render() {
            if (this.start==undefined){
                this.start=this.props.capacity;
                this.capacity=this.props.capacity;
            }
        return (
            <div className="zoomControl">
                <div
                    className="zoom"

                >
                    <Line percent={this.state.zoom*100/this.capacity} strokeWidth="1" strokeColor="#25cfcc" />
                    {this.state.zoom} mL
                </div>


                <button
                    className="zoomIn"
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                >
                    +
                </button>
                <button
                    className="zoomOut"
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.zoomOutDown}
                >
                    -
                </button>
                <button
                    className="zoomOut"
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.zoomOutDownBig}
                >
                    --
                </button>
            </div>
        );
    }
}
export {Drag};
