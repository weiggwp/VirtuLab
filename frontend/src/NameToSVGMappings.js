import Watersvg from "./components/water"
import Small_flask_svg from "./components/svg_sm_flask";
import Cylinder_svg from "./components/svg_graduatedCylinder";
import beaker_svg from "./components/svg_beaker";
import volFlask_svg from "./components/svg_volumetricFlask";
import pipette_svg from "./components/svg_pipette"
import svg_scale from "./components/svg_scale"
import React from "react";

export default function GetSVG(props) {
    const mappings = {
        "Water":Watersvg,
        "Glucose Solution":Small_flask_svg,
        "Acids":Small_flask_svg,
        "Bases":Small_flask_svg,
        "Titration Flask":Small_flask_svg,
        "Graduated Cylinder":Cylinder_svg,
        "Beaker": beaker_svg,
        "Volumetric Flask": volFlask_svg,
        "Pipette": pipette_svg,
        "Scale": svg_scale,

    };



    if(props.type==="General")
    {
        var variable = props.equip.chemProp===undefined?"Water":props.equip.chemProp;
    }
    else
    {
        var variable= props.type;
    }

    const Component = mappings[variable];


    return (
        <Component fill={props.fill} fill_percent={props.fill_percent} equip={props.equip} size={props.size} onDrop={props.onDrop} id={props.id}/>
    );
}