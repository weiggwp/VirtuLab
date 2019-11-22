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
                <Image  style={{height:"7vh",width:"6vh",display:"inline-block"}}
                       src={this.props.image}
                      rounded/>
                {this.props.description}

            </div>
        )
    }
}

export {Equipment}