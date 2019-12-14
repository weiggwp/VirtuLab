import React from "react";
import {Image, Nav} from "react-bootstrap";
import '../stylesheets/slides.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Tool from "../Tool";


class Slides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // numChildren: props.slide_num,
            // addChild: props.addChild,
            curStep: 0,
            delFun: this.props.delChild,
            active:0
        }

        this.handleDelButton = this.handleDelButton.bind(this);
    };

    isHidden()
    {
        if(this.props.hidden)
        {

            return "none"

        }
        return ""
    }


    handleOnSelectedKey(selectedKey){
        this.setState({
            curStep: selectedKey,
            active:selectedKey,
        })
    }

    handleDelButton() {
        this.state.delFun(this.state.curStep)


        this.forceUpdate()


        // alert("HI")
    }


    render () {

        const children = [];
        //onSelect={this.props.onSelect}

        if (this.props.role !== undefined) {

            for (let i = 1; i < this.props.completedSteps + 2; i += 1) {
                children.push(<ChildComponent key={i} number={i}/>);
            }

            return (

                <div>
                    <Nav variant="pills" className="flex-column">
                        {children}
                    </Nav>
                </div>
                )

        }
        else {
            const children = [];
            //onSelect={this.props.onSelect}
            children.push(<ChildComponent selectStep={this.props.onSelect} key={0} number={0}/>);

            for (let i = 1; i <= this.props.slide_num; i += 1) {
                children.push(<ChildComponent key={i} number={i} selectStep={this.props.onSelect}/>);
            }

            return (
                <div>
                    <div  style={{width:"100%",display:this.isHidden()}} onClick={this.props.addChild} >
                        <button className="newButton"
                                style={{width:"100%",backgroundColor:"transparent",borderStyle:"none"}}
                                variant="flat" >

                            <Image className="add"
                                   src="https://img.icons8.com/cotton/2x/plus.png"
                                   rounded/>

                            <span style={{float:"right",marginTop:8,color:"white",fontWeight:"bold"}} >Add</span>
                    </button>
                </div>
                    <div  style={{width:"100%",display:this.isHidden()}} onClick={this.handleDelButton}>
                        <button className="newButton"
                                style={{width:"100%",backgroundColor:"transparent",borderStyle:"none"}}
                                variant="flat" >

                            <Image className="add"
                                   src="https://img.icons8.com/cotton/2x/minus.png"
                                   rounded/>

                            <span style={{float:"right",marginTop:8,color:"white",fontWeight:"bold"}} >Delete</span>
                        </button>
                    </div>


                    <Nav activeKey={this.state.active} variant="pills" className="flex-column" onSelect={selectedKey => this.handleOnSelectedKey(selectedKey)}>
                        {children}
                    </Nav>
                </div>
            );
        }
    }


}


function isComplete (stepnum,aa){
    if (stepnum==1)
        return stepnum

    else return stepnum
}

//onSelect={(e)=>(props.onSelect(e,props.number))

const ChildComponent = props => <Nav.Item> <Nav.Link
    className={"step"}
    eventKey={props.number}
    //onClick={(e)=>(props.selectStep(e, props.number))}
>
    Step {props.number}
</Nav.Link> </Nav.Item>;

// const ChildComponent = props => <ToggleButton value={props.number} className={"Btn-Blue-BG togglebutton "}>{"Step "+props.number}</ToggleButton>;

export {Slides};