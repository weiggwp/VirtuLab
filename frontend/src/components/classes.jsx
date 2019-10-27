import React from 'react';
import {Button, Col, Row} from "react-bootstrap";

class Classes extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        let style = this.props.style;
        let classes = [
        {classname:"Class 1: Study of Organisms and Behaviors| Fall 2019"},
        {classname:'Class 2: Introduction to General Chemistry| Fall 2019'}]

        ;
        return (
            <div>
                {classes.map(classItem => (

                    <Row>
                        <Col md={{span:5,offset:2}}>
                            <h3 className={style}>{classItem.classname}</h3>
                        </Col>

                        <Col md={{ span: 1, offset: 0 }}>

                            <Button className={"dropButton"} block bsSize="small" type="submit">
                            Drop Class
                            </Button>
                        </Col>
                    </Row>





                ))}

            </div>
        );
    }


}

export {Classes};