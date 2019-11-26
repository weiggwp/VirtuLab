import Element from "./Element.js";
import Equipment from "./Equipment.js";
import Glassware from "./Glassware";
import Tool from "./Tool.js";


import water from "./Images/water.svg";

import small_flask from "./Images/250mLFlask.svg";
import medium_flask from "./Images/500mLFlask.svg";
import large_flask from "./Images/1000mLFlask.svg";

import small_beaker from "./Images/250mLBeaker.svg";
import medium_beaker from "./Images/600mLBeaker.svg";
import large_beaker from "././Images/1000mLBeaker.svg";

import small_cylinder from "./Images/10mLGraduatedCylinder.svg";
import medium_cylinder from "./Images/25mLGraduatedCylinder.svg";
import large_cylinder from "./Images/50mLGraduatedCylinder.svg";

import small_pipette from "./Images/5mLPipette.svg";
import medium_pipette from "./Images/10mLPipette.svg";
import large_pipette from "./Images/25mLPipette.svg";

import small_volFlask from "./Images/100mLVolumetricFlask.svg";
import medium_volFlask from "./Images/250mLVolumetricFlask.svg";
import large_volFlask from "./Images/1000mLVolumetricFlask.svg";

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
        return [new Glassware("Flask",small_flask,250,0,0),
            new Glassware("Flask",medium_flask,500,0,0),
            new Glassware("Flask",large_flask,1000,0,0),]
    }
    createCylinders()
    {
        return [new Glassware("Graduated Cylinder",small_cylinder,10,0,0),
            new Glassware("Graduated Cylinder",medium_cylinder,25,0,0),
            new Glassware("Graduated Cylinder",large_cylinder,50,0,0),]
    }
    createBeakers()
    {
        return [new Glassware("Beaker",small_beaker,250,0,0),
            new Glassware("Beaker",medium_beaker,600,0,0),
            new Glassware("Beaker",large_beaker,1000,0,0),]
    }
    createVolumetricFlasks()
    {
        return [new Glassware("Volumetric Flask",small_volFlask,100,0,0),
            new Glassware("Volumetric Flask",medium_volFlask,250,0,0),
            new Glassware("Volumetric Flask",large_volFlask,1000,0,0),]
    }
    createPipettes()
    {
        return [new Glassware("Pipette",small_pipette,5,0,0),
            new Glassware("Pipette",medium_pipette,10,0,0),
            new Glassware("Pipette",large_pipette,25,0,0),]
    }


    populateList() {
        this.equipmentList['Solution'] = [new Element("Distilled Water", water, 3000, 0, 1)];

        this.equipmentList['Glassware'] = {
            'Erlenmeyers': this.createFlasks(),
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


