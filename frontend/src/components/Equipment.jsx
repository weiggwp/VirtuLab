import React from 'react'
import {Image, Nav} from "react-bootstrap";

class Equipment extends React.Component{
    // const [{isDragging}, drag] = useDrag({
    //     item: { type: ItemTypes.Equipment },
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // })

    render()
    {
        return (
            <div

                style={{

                    cursor: 'move',
                }}
            >
                <Image  style={{height:"6vh",width:"6vh"}}
                       src={this.props.image}
                      rounded/>

            </div>
        )
    }
}

export {Equipment}