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

class test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 1
        };
        this.t = undefined;
        this.start = 100;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.repeat = this.repeat.bind(this);
        this.zoom = this.zoom.bind(this);

        // this.onMouseUp = this.onMouseUp.bind(this)
        this.zoomOut = this.zoomOut.bind(this);
        this.zoomOutRepeat = this.zoomOutRepeat.bind(this);
        this.zoomOutDown = this.zoomOutDown.bind(this);

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
        if(this.state.zoom>=100)
            return
        this.setState({ zoom: Math.round((this.state.zoom + 0.2)*100)/100  });
    }

    // ZOOM OUT

    zoomOut() {
        if(this.state.zoom<=0)
            return
        this.setState({ zoom: Math.round((this.state.zoom - 0.2)*100)/100  });
    }

    zoomOutRepeat() {
        this.zoomOut();
        this.t = setTimeout(this.zoomOutRepeat, this.start);
        this.start = this.start / 2;
    }

    zoomOutDown(e) {
        e.preventDefault();
        this.zoomOutRepeat();
    }

    // STOP ZOOMING
    onMouseUp() {
        clearTimeout(this.t);
        this.start = 100;
    }

    render() {
        return (
            <div className="zoomControl">
                <div
                    className="zoom"

                >
                    <Line percent={this.state.zoom} strokeWidth="1" strokeColor="#25cfcc" />
                    {this.state.zoom}
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
            </div>
        );
    }
}
export default test;
