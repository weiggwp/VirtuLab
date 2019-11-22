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
                }}
            >
                <Image  style={{height:"4vh",width:"5vh"}}
                       src={this.props.image}
                      rounded/>

            </div>
        )
    }
}

export {Equipment}