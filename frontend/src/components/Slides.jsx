import React from "react";
import {Image, Nav} from "react-bootstrap";
import '../stylesheets/slides.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


class Slides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // numChildren: props.slide_num,
            // addChild: props.addChild,
            curStep: 0,
            delFun: this.props.delChild
        }

        this.handleDelButton = this.handleDelButton.bind(this);
    };


    handleOnSelectedKey(selectedKey){
        this.setState({
            curStep: selectedKey
        })
    }

    handleDelButton() {
        this.state.delFun(this.state.curStep)
        // alert("HI")
    }


    render (){
        const children = [];
        //onSelect={this.props.onSelect}

        children.push(<ChildComponent selectStep={this.props.onSelect} key={0} number={0} />);

        for (let i = 1; i <= this.props.slide_num; i += 1) {
            children.push(<ChildComponent key={i} number={i} selectStep={this.props.onSelect}/>);
        }
        return (

            <div>
                <div style={{width:"100%"}} onClick={this.props.addChild} >
                    <button className="newButton" style={{width:"100%",backgroundColor:"transparent",borderStyle:"none"}}  variant="flat" >

                        <Image  className="add"  src="https://secure.webtoolhub.com/static/resources/icons/set114/28bdd2bd.png" rounded />

                        <span style={{float:"right",marginTop:8,color:"white",fontWeight:"bold"}} >Add</span>

                    </button>
                </div>

                <Nav variant="pills" className="flex-column" onSelect={selectedKey => this.handleOnSelectedKey(selectedKey)}>
                    {children}
                </Nav>
            </div>
        );
    }


}

// const ParentComponent = props => (
//     //<div style={{height:"5vh",display:"inline",overflowX:"scroll"}}>
//     <div >
//         {/*tyle={{overflowY:"scroll"}}>*/}
//         <div>
//             <a href="#" onClick={props.addChild}>
//                 <Image  className="add" src="https://secure.webtoolhub.com/static/resources/icons/set114/28bdd2bd.png" rounded />
//                 Add new
//             </a>
//         </div>
//
//         {/*<Container style={{overflowY:"scroll",height:"100%"}}>*/}
//             {/*<Row style={{overflowX:"scroll",height:"7vh",marginTop:"5px"}}>*/}
//             {/*    <div id="children-pane" style={{width:"35vh",marginTop:"5px"}}>*/}
//         <div >
//
//             {/*<ButtonToolbar>*/}
//                 <ToggleButtonGroup vertical className={"Btn-Blue-BG"} type="radio" name="options" >
//                     {/*<ToggleButton value={1} className={"Btn-Blue-BG togglebutton btn-info"}>{"Step 1"}</ToggleButton>*/}
//                     {/*<ToggleButton value={2} className={"Btn-Blue-BG togglebutton btn-info"}>{"Step 2"}</ToggleButton>*/}
//
//                     {props.children}
//
//                 </ToggleButtonGroup>
//             {/*</ButtonToolbar>*/}
//         </div>
//                 {/*</div>*/}
//             {/*</Row>*/}
//         {/*</Container>*/}
//
//     </div>
//     // </div>
// );

function isComplete (stepnum,aa){
    console.log("props is "+JSON.stringify(aa))
    if (stepnum==1)
        return stepnum

    else return stepnum
}

//onSelect={(e)=>(props.onSelect(e,props.number))

const ChildComponent = props => <Nav.Item> <Nav.Link
    className={"step"}
    eventKey={props.number}
    onClick={(e)=>(props.selectStep(e, props.number))}>
    Step {props.number}
</Nav.Link> </Nav.Item>;

// const ChildComponent = props => <ToggleButton value={props.number} className={"Btn-Blue-BG togglebutton "}>{"Step "+props.number}</ToggleButton>;

export {Slides};