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
        }
    };

    render (){
        const children = [];
        children.push(<ChildComponent key={0} number={0} />);

        for (let i = 1; i <= this.props.slide_num; i += 1) {
            children.push(<ChildComponent key={i} number={i}/>);
        }

        return (
            <div>
                <div>
                    <a href="#" onClick={this.props.addChild}>
                        <Image  className="add" src="https://secure.webtoolhub.com/static/resources/icons/set114/28bdd2bd.png" rounded />
                        Add new
                    </a>
                </div>

                <Nav variant="pills" className="flex-column">
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

const ChildComponent = props => <Nav.Item> <Nav.Link eventKey={props.number}>Step {props.number}</Nav.Link> </Nav.Item>;
// const ChildComponent = props => <ToggleButton value={props.number} className={"Btn-Blue-BG togglebutton "}>{"Step "+props.number}</ToggleButton>;

export {Slides};