import Watersvg from "./components/water"
import Small_flask_svg from "./components/svg_sm_flask";
import Cylinder_svg from "./components/svg_graduatedCylinder";
import beaker_svg from "./components/svg_beaker";
import volFlask_svg from "./components/svg_volumetricFlask";
import pipette_svg from "./components/svg_pipette"

import React from "react";



export default function GetSVG(props) {
    const mappings = {
        "Distilled Water":Watersvg,
        "Erlenmeyer Flask":Small_flask_svg,
        "Graduated Cylinder":Cylinder_svg,
        "Beaker": beaker_svg,
        "Volumetric Flask": volFlask_svg,
        "Pipette": pipette_svg,

    };
    const Component = mappings[props.name];

    return (
        <Component fill={props.fill} fill_percent={props.fill_percent} size={props.size} onDrop={props.onDrop} id={props.id}/>
    );
}