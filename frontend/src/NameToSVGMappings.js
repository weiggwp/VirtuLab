import Watersvg from "./components/svg_water"
import Small_flask_svg from "./components/svg_sm_flask";
import Cylinder_svg from "./components/svg_graduatedCylinder";
import Beaker_svg from "./components/svg_beaker";
import volFlask_svg from "./components/svg_volumetricFlask";
import pipette_svg from "./components/svg_pipette"
import svg_scale from "./components/svg_scale"
import svg_flammableBottle from "./components/svg_flammableBottle"
import svg_blackBottle from "./components/svg_blackBottle"
import svg_bunsenBurner from "./components/svg_bunsenBurner"
import svg_bottle from "./components/svg_bottle"
import React from "react";

export default function GetSVG(props) {
    let variable;
    const mappings = {
        "Water":Watersvg,
        "Glucose Solution":svg_bottle,
        "Acids":svg_bottle,
        "Bases":svg_bottle,
        "Titration Flasks":Small_flask_svg,
        "Graduated Cylinders":Cylinder_svg,
        "Beakers": Beaker_svg,
        "Volumetric Flasks": volFlask_svg,
        "Pipettes": pipette_svg,
        "Stock Solutions": svg_flammableBottle,
        "Indicators": svg_blackBottle,

        "Scale": svg_scale,
        "Bunsen Burner": svg_bunsenBurner,


    };



    if(props.type==="General")
    {

        const notDefined = props.equip.chemProp===undefined||props.equip.chemProp===null;
        variable = notDefined ? "Water" : props.equip.chemProp;
    }
    else
    {
        variable = props.type;
    }

    const Component = mappings[variable];


    return (
        <Component
            fill={props.fill}
            fill_percent={props.fill_percent}
            size={props.size}
            onDrop={props.onDrop}
            id={props.id}
            // degree={props.degree}
            equip={props.equip}
        />
    );
}