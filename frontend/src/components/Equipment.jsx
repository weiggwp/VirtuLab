import React from 'react'
import {Button, Image, Nav} from "react-bootstrap";
// import { StyleSheet, Platform, View, Text } from 'react-native';


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
    getSubscript(string){
    // {
    //     <View style={styles.MainContainer}>
    //
    //         <View style={{flexDirection: 'row'}}>
    //
    //             string.map((letter)=>(
    //
    //                 if(letter
    //
    //
    //             ));
    //
    //             <Text style={{fontSize: 20, lineHeight: 30, color: '#000'}}>A</Text>
    //
    //             <Text style={{fontSize: 11, lineHeight: 18, color: '#000'}}>2</Text>
    //
    //             <Text style={{fontSize: 20, lineHeight: 30, color: '#000'}}>+</Text>
    //
    //             <Text style={{fontSize: 20, lineHeight: 30, color: '#000'}}>B</Text>
    //
    //             <Text style={{fontSize: 11, lineHeight: 18, color: '#000'}}>2</Text>
    //
    //         </View>
    }
    render()
    {
        return (
            <div

                style={{

                    float:"left",
                    opacity:this.props.opacity,
                }}
            >
                <Image  style={{opacity:this.props.opacity,height:"6.6vh",width:"6vh",display:"inline-block"}}
                       src={this.props.image}
                      rounded/>

                {/*{this.props.description}*/}
                <div style={{opacity:this.props.opacity,display:"inline-block"}} dangerouslySetInnerHTML={{ __html: this.props.description}}/>

            </div>
        )
    }
}

export {Equipment}