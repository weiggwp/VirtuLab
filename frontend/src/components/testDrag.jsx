import React from 'react'
import {Image, Nav} from "react-bootstrap";
import {Equipment} from "./Equipment";
import Draggable from "react-draggable";
import reactCSS from 'reactcss'
import '../stylesheets/create_lab.css';
import { ReactComponent as Example } from '../Images/water.svg';
import water from '../Images/water.svg';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {ChromePicker, PhotoshopPicker, SketchPicker} from 'react-color'
let dragSrcEl = null;

class test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            background:"#dee4e4",
            displayColorPicker: false,
            presetColors:["#dee4e4"]

        };

    }
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.hex })
    };


    handleChangeComplete = (color,event) => {
        console.log(color.hex,event)
        this.setState({ background: color.hex });
    };






//color=default color
    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: this.state.color,
                    color: "black",
                    textShadow: "2px 2px #ffff",
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });
        // alert(this.props.equipment.image);
        return (
            <div

            >

                    <div style={ styles.swatch } onClick={ this.handleClick }>
                        <div style={ styles.color } >
                            hello
                            </div>
                    </div>
                    { this.state.displayColorPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleClose }/>
                        <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                    </div> : null }




            </div>


        )
    }
}

export default test;