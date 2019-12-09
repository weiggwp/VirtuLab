import Watersvg from "./components/water"
import Small_flask_svg from "./components/svg_sm_flask";
import Cylinder_svg from "./components/svg_graduatedCylinder"
import React from "react";



export default function GetSVG(props) {
    const mappings = {
        "Distilled Water":Watersvg,
        "Erlenmeyer Flask":Small_flask_svg,
        "Graduated Cylinder":Cylinder_svg,
    }
    const Component = mappings[props.name];

    return (
        <Component fill={props.fill} fill_percent={props.fill_percent} size={props.size} onDrop={props.onDrop} id={props.id}/>
    );
}