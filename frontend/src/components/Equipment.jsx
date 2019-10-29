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
                       src="https://cdn.iconscout.com/icon/premium/png-256-thumb/water-bottle-1738496-1475816.png" rounded/>

            </div>
        )
    }
}

export {Equipment}