import Element from "./Element.js";
import Glassware from "./Glassware";
import Tool, {Scale, BunsenBurner} from "./Tool.js";


import water from "./Images/water.svg";


import flame from "./Images/2500mLBottle.svg";
import no_flame from "./Images/2500mLBottleNonSticker.svg";
import indicator from "./Images/100mLBottle_black.svg";



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


export default class EquipmentSet {
    constructor() {

        //solution list is not yet full and can be expanded
        this.equipmentList =
            {
                'Solution': [],
                'Glassware': {},
                'Tools': []


            };
        this.populateList();
    }

    setEquipmentList(list) {
        this.equipmentList = list;
    }

    getEquipments() {
        return this.equipmentList;
    }

    createFlasks() {
        return [new Glassware("Erlenmeyer Flask", small_flask, 250, 100, 0, 60),
            new Glassware("Erlenmeyer Flask", medium_flask, 500, 200, 0, 75),
            new Glassware("Erlenmeyer Flask", large_flask, 1000, 400, 0, 80),]
    }

    createCylinders() {
        return [new Glassware("Graduated Cylinder", small_cylinder, 10, 25, 0, 40),
            new Glassware("Graduated Cylinder", medium_cylinder, 25, 65, 0, 45),
            new Glassware("Graduated Cylinder", large_cylinder, 50, 130, 0, 50),]
    }

    createBeakers() {
        return [new Glassware("Beaker", small_beaker, 250, 100, 0, 70),
            new Glassware("Beaker", medium_beaker, 600, 200, 0, 85),
            new Glassware("Beaker", large_beaker, 1000, 400, 0, 100),]
    }


    createVolumetricFlasks() {
        return [new Glassware("Volumetric Flask", small_volFlask, 100, 50, 0, 70),
            new Glassware("Volumetric Flask", medium_volFlask, 250, 125, 0, 85),
            new Glassware("Volumetric Flask", large_volFlask, 1000, 600, 0, 100),]

    }

    createPipettes() {
        return [new Glassware("Pipette", small_pipette, 5, 5, 0, 70),
            new Glassware("Pipette", medium_pipette, 10, 10, 0, 85),
            new Glassware("Pipette", large_pipette, 25, 25, 0, 100),]
    }

    createStockSolutions()
    {
        const size = 100;
        return [
            new Element("19M NaOH",             flame,2000,1.515,   1,size,"Sodium Hydroxide"),
            new Element("11.6M HCI",            flame,2000,1.18,    1,size,"Hydrochloric Acid"),
            new Element("17.6M H\u2082SO\u2084",flame,2000,1.83,    1,size,"Sulfuric Acid"),
            new Element("15.4M HNO\u2083",      flame,2000,1.51,    1,size,"Nitric Acid"),
            new Element("14.6M H\u2083PO\u2084",flame,2000,1.87,    1,size,"Phosphoric Acid"),
            new Element("15.4M NH\u2083",       flame,2000,0.68,    1,size,'Ammonia')
        ]

    }
    createAcids()
    {

        return [new Element("3M HBr",// name
            no_flame, // image
            250, // capacity
            1.49, // weight
            1, // state
            75, //size
            "Hydrobromic Acid",
            ),
            new Element("3M HCI",no_flame,250,1.18,1,75,"Hydrochloric Acid"),
            new Element("3M H\u2082SO\u2084",no_flame,250,1.83,1,75,"Sulfuric Acid"),
            new Element("3M HNO\u2083",no_flame,250,1.51,1,75,"Nitric Acid"),
            new Element("3M H\u2083PO\u2084",no_flame,250,1.87,1,75,"Phosphoric Acid")
            ]
    }

    createBases()
    {
        return [
            new Element("3M NaOH", no_flame, 250, 1.515, 1,75,"Sodium Hydroxide"),
            new Element("3M NH\u2083",no_flame,250,0.68,1,75,'Ammonia')
        ]
    }

    createGeneral()
    {
        return[
            new Element("Distilled Water", water, 3000, 1, 1, 130,"Distilled Water"),
            new Element("1M C\u2086H\u2081\u2082O\u2086", no_flame, 250, 1.56, 1, 75,"Glucose Solution",)

        ]
    }

    createIndicators()
    {
        const size = 75;

        return [
            new Element("Methyl Orange",indicator,100,1,1,size),
            new Element("Methyl Red",indicator,100,1,1,size),
            new Element("Phenolphthalein",indicator,100,1,1,size),
            new Element("Bromocresol Green",indicator,100,1,1,size),


        ]
    }


    populateList() {

        this.equipmentList['Solution'] = {
            'General': this.createGeneral(),
            'Stock Solutions':this.createStockSolutions(),
            'Acids':this.createAcids(),
            'Bases':this.createBases(),
            'Indicators':this.createIndicators()

        };


        this.equipmentList['Glassware'] = {
            'Titration Flasks': this.createFlasks(),
            'Graduated Cylinders': this.createCylinders(),
            'Pipettes': this.createPipettes(),
            'Beakers': this.createBeakers(),
            'Volumetric Flasks': this.createVolumetricFlasks()
        };

        //solution and tool types are set in constructor, as they don't have nested def's
        //new BunsenBurner('Bunsen Burner', bunsun_burner,215,'°C',100),
        this.equipmentList['Tools'] = [
            new Scale('Scale', scale)];

        this.assignTypes();
    }
    assignTypes()
    {
        const glass = this.equipmentList['Glassware'];
        var solution = this.equipmentList['Solution']
        Object.keys(glass).map((elements,index)=>
            (
                glass[elements].map((equipment) => (
                    equipment.setType(elements)



                ))
            )

        );

        Object.keys(solution).map((elements,index)=>
            (
                solution[elements].map((equipment) => (
                    equipment.setType(elements)



                ))
            )

        );
    }

    setType(elements) {
        elements.map((equipment) => (
                equipment.setType()
            )
        )
    }

    getJSONList() {

        return this.getFlatList();
    }


    getFlatList()
    {

        var glass = this.equipmentList['Glassware'];
        var solution = this.equipmentList['Solution']
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

        Object.keys(solution).map((elements,index)=>
            (
                solution[elements].map((equipment) => (
                    result.push(equipment)



                ))
            ))


        this.equipmentList['Tools'].map((equipment) => (
            result.push(equipment)


        ))
        return result;
    }












}
