import React from "react";
import {Image} from "react-bootstrap";
import '../stylesheets/slides.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


class Slides extends React.Component {
    state = {
        numChildren: 0
    }

    render () {
        const children = [];
        children.push(<ChildComponent key={0} number={0} />);

        for (let i = 1; i <= this.state.numChildren; i += 1) {
            children.push(<ChildComponent key={i} number={i} />);
        };

        return (
            <ParentComponent  addChild={this.onAddChild}>

                {children}
            </ParentComponent>
        );
    }

    onAddChild = () => {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
}

const ParentComponent = props => (
    //<div style={{height:"5vh",display:"inline",overflowX:"scroll"}}>
    <div >
        {/*tyle={{overflowY:"scroll"}}>*/}
        <div>
            <a href="#" onClick={props.addChild}>
                <Image  className="add" src="https://secure.webtoolhub.com/static/resources/icons/set114/28bdd2bd.png" rounded />
                Add new
            </a>
        </div>

        {/*<Container style={{overflowY:"scroll",height:"100%"}}>*/}
            {/*<Row style={{overflowX:"scroll",height:"7vh",marginTop:"5px"}}>*/}
            {/*    <div id="children-pane" style={{width:"35vh",marginTop:"5px"}}>*/}
        <div   >

            {/*<ButtonToolbar>*/}
                <ToggleButtonGroup vertical className={"Btn-Blue-BG"} type="radio" name="options" >
                    {/*<ToggleButton value={1} className={"Btn-Blue-BG togglebutton btn-info"}>{"Step 1"}</ToggleButton>*/}
                    {/*<ToggleButton value={2} className={"Btn-Blue-BG togglebutton btn-info"}>{"Step 2"}</ToggleButton>*/}

                    {props.children}

                </ToggleButtonGroup>
            {/*</ButtonToolbar>*/}
        </div>
                {/*</div>*/}
            {/*</Row>*/}
        {/*</Container>*/}

    </div>
    // </div>
);

const ChildComponent = props => <ToggleButton value={props.number} className={"Btn-Blue-BG togglebutton "}>{"Step "+props.number}</ToggleButton>;

export {Slides};