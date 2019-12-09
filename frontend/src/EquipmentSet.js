import Element from "./Element.js";
import Equipment from "./Equipment.js";
import Glassware from "./Glassware";
import Tool from "./Tool.js";


import water from "./Images/water.svg";
import watersvg from "./components/water"

import small_flask from "./Images/250mLFlask.svg";
import small_flask_svg from "./components/svg_sm_flask";

import medium_flask from "./Images/500mLFlask.svg";
import large_flask from "./Images/1000mLFlask.svg";

import small_beaker from "./Images/250mLBeaker.svg";
import medium_beaker from "./Images/600mLBeaker.svg";
import large_beaker from "././Images/1000mLBeaker.svg";
import beaker_svg from "./components/svg_beaker";

import small_cylinder from "./Images/10mLGraduatedCylinder.svg";
import medium_cylinder from "./Images/25mLGraduatedCylinder.svg";
import large_cylinder from "./Images/50mLGraduatedCylinder.svg";
import cylinder_svg from "./components/svg_graduatedCylinder"

import small_pipette from "./Images/5mLPipette.svg";
import medium_pipette from "./Images/10mLPipette.svg";
import large_pipette from "./Images/25mLPipette.svg";

import small_volFlask from "./Images/100mLVolumetricFlask.svg";
import medium_volFlask from "./Images/250mLVolumetricFlask.svg";
import large_volFlask from "./Images/1000mLVolumetricFlask.svg";
import volFlask_svg from "./components/svg_volumetricFlask"

import bunsun_burner from "./Images/bunsenBurner.svg";
import scale from "./Images/scale.svg";
import {Draggable_equipment} from "./components/Draggable_equipment";

import React from "react";


export default class EquipmentSet{
    constructor() {

        //solution list is not yet full and can be expanded
        this.equipmentList =
            {
                'Solution': [],
                'Glassware': {},
                'Tools': []


            }
            this.populateList();
    }
    setEquipmentList(list)
    {
        this.equipmentList=list;
        console.log("loading equipment list in js ",list)
    }
    getEquipments()
    {
        return this.equipmentList;
    }
    createFlasks()
    {
        return [new Glassware("Erlenmeyer Flask",small_flask,250,100,0,100),
            new Glassware("Erlenmeyer Flask",medium_flask,500,200,0,125),
            new Glassware("Erlenmeyer Flask",large_flask,1000,400,0,150),]
    }
    createCylinders()
    {
        return [new Glassware("Graduated Cylinder",small_cylinder,10,25,0,70),
            new Glassware("Graduated Cylinder",medium_cylinder,25,65,0,85),
            new Glassware("Graduated Cylinder",large_cylinder,50,130,0,100),]
    }
    createBeakers()
    {
        return [new Glassware("Beaker",small_beaker,250,100,0,beaker_svg,70),
            new Glassware("Beaker",medium_beaker,600,200,0,beaker_svg,85),
            new Glassware("Beaker",large_beaker,1000,400,0,beaker_svg,100),]
    }
    createVolumetricFlasks()
    {
        return [new Glassware("Volumetric Flask",small_volFlask,100,50,0,volFlask_svg,70),
            new Glassware("Volumetric Flask",medium_volFlask,250,125,0,volFlask_svg,85),
            new Glassware("Volumetric Flask",large_volFlask,1000,600,0,volFlask_svg,100),]
    }
    createPipettes()
    {
        return [new Glassware("Pipette",small_pipette,5,5,0),
            new Glassware("Pipette",medium_pipette,10,10,0),
            new Glassware("Pipette",large_pipette,25,25,0),]
    }


    populateList() {
        this.equipmentList['Solution'] = [new Element("Distilled Water", water, 3000, 1, 1,130)];

        this.equipmentList['Glassware'] = {
            'Titration Flask': this.createFlasks(),
            'Graduated Cylinders': this.createCylinders(),
            'Pipettes': this.createPipettes(),
            'Beakers': this.createBeakers(),
            'Volumetric Flasks': this.createVolumetricFlasks()
        }

        //solution and tool types are set in constructor, as they don't have nested def's
        this.equipmentList['Tools'] = [new Tool('Bunsun Burner', bunsun_burner),
            new Tool('Scale', scale),]
        this.assignTypes();
    }
    assignTypes()
    {
        var glass = this.equipmentList['Glassware'];
        Object.keys(glass).map((elements,index)=>
            (
                glass[elements].map((equipment) => (
                    equipment.setType(elements)



                ))
            )

        );
    }
    setType(elements)
    {
        elements.map((equipment)=>(
            equipment.setType()
            )
        )
    }

    getJSONList()
    {

        return this.getFlatList();
    }

    getFlatList()
    {

        var glass = this.equipmentList['Glassware'];
        var result = [];
        // Object.keys(glass).map((element)=>
        //     (
        //         result.push(glass[element])
        //     )
        //
        // );
        Object.keys(glass).map((elements,index)=>
            (
                glass[elements].map((equipment) => (
                    result.push(equipment)



                ))
            ))
        this.equipmentList['Solution'].map((equipment) => (
            result.push(equipment)


        ))
        this.equipmentList['Tools'].map((equipment) => (
            result.push(equipment)


        ))
        return result;
    }












}


