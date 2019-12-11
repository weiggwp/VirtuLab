import React from 'react'

import {ChromePicker, PhotoshopPicker, SketchPicker} from 'react-color'
import reactCSS from "reactcss";

class ColorPicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            background:"#dee4e4",
            color:"#dee4e4",
            displayColorPicker: false,
            presetColors:["#dee4e4","red","pink","orange","green","blue","purple","#CAA2C1","brown","black"]

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
        this.props.setColor(color.hex);
    };


    handleChangeComplete = (color,event) => {
        this.setState({ background: color.hex });
    };


//color=default color
    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    paddingLeft:'15px',
                    width: '100%',
                    height: '100%',
                    borderRadius: '2px',
                    background: this.state.color,
                    color: "black",
                    textShadow: "1px 1px 3px #ffff",

                },
                swatch: {
                    width: '100%',
                    height: '100%',
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
        return (
            <div

            >

                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } >
                        Change Fill Color
                    </div>
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker presetColors={this.state.presetColors} color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }




            </div>


        )
    }
}

export {ColorPicker};