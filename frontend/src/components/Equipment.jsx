import React from 'react'
import {Image, Nav} from "react-bootstrap";


class Equipment extends React.Component{
    // const [{isDragging}, drag] = useDrag({
    //     item: { type: ItemTypes.Equipment },
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // })
    constructor(props)
    {
        super(props);
        this.state ={
            name:"",
            amount:0,
            capacity:0,
            state:0,
            images:{},
            items:{},
        }
    }
    render()
    {
        return (
            <div

                style={{

                    cursor: 'move',
                    opacity:this.props.opacity,
                }}
            >
                <Image  style={{height:"6.6vh",width:"6vh",display:"inline-block"}}
                       src={this.props.image}
                      rounded/>
                {this.props.description}

            </div>
        )
    }
}

export {Equipment}