import React from "react";
import {Image} from "react-bootstrap";
import '../stylesheets/slides.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


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
    <div>
        <div><a href="#" onClick={props.addChild}>
        <Image  className="add" src="https://secure.webtoolhub.com/static/resources/icons/set114/28bdd2bd.png" rounded />
        add new step

        </a>
        </div>
        <Container>
            <Row style={{overflowX:"scroll",height:"7vh",marginTop:"5px"}}>
                <div id="children-pane" style={{width:"35vh",marginTop:"5px"}}>
                    {props.children}
                </div>



            </Row>
        </Container>

    </div>
    // </div>
);

const ChildComponent = props => <Col className={"slideCard child"}>{props.number}</Col>;

export {Slides};