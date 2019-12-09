import Watersvg from "./components/water"
import Small_flask_svg from "./components/svg_sm_flask";
import Cylinder_svg from "./components/svg_graduatedCylinder"
import React from "react";



export default function GetSVG(props) {
    const mappings = {
        "Water":Watersvg,
        "Glucose Solution":Small_flask_svg,
        "Acids":Small_flask_svg,
        "Bases":Small_flask_svg,
        "Titration Flask":Small_flask_svg,
        "Graduated Cylinder":Cylinder_svg,
    }

    if(props.type==="General")
    {
        var variable = props.equip.chemProp===undefined?"Water":props.equip.chemProp;
    }
    else
    {
        var variable= props.type;
    }
    console.log(variable)

    const Component = mappings[variable];


    return (
        <Component fill={props.fill} fill_percent={props.fill_percent} size={props.size} onDrop={props.onDrop} id={props.id}/>
    );
}