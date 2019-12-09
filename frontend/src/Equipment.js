// import Workspace from "./Workspace.js";
// Initializing a class definition


import Glassware from "./Glassware";

export default class Equipment {

    constructor(name,image,weight, type,state=0,size=100,svgArgs ={})
    {

        this.name = name;
        this.color="#dee4e4";   //default clear color
        this.type = "water";
        this.weight = weight;
        this.amount=0;
        this.unit="";
        this.capacity=0;
        this.temperature=15;
        this.type=type;
        this.state=state;
        this.image=image;
        this.items=[];
        this.disabled = false;
        this.left = 0;
        this.top = 0;
        this.size = size;
        this.svgArgs = svgArgs;
    }

    getSvgArgs(){
        return "placeholder";
    }

    setColor(color)
    {
        this.color =color
    }

    getAmount(){
        return this.amount;
    }

    setDisabled(j)
    {
        this.disabled = j;
    }
    setLocation(x,y)
    {
        this.left=x;
        this.top=y;
    }

    setItems(item){
        this.items=item;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    setType(type)
    {
        this.type =type;

    }


    item_exist(item){
        const array = this.items;

        if(array === undefined || array.length === 0){
            return false;
        }
        let bool = false;
        array.forEach(function (arrayItem) {
            if (arrayItem.name===item.name){
                bool = true;
            }
        });
        return bool;
    }

    find(item){
        const array = this.items;
        if(array === undefined || array.length === 0){
            return null;
        }
        let itemfound = null;
        array.forEach(function (arrayItem) {
            if (arrayItem.name===item.name){
                itemfound = arrayItem;
            }
        });
        return itemfound;
    }
    add_item(item){
        this.items.push(item);
    }
    add_items(items){
        this.items.concat(items);
    }

    toString()
    {
        return this.name;
    }


    canInteract(target)
    {
        return false;

    }
    toStateString()
    {
        return this.amount+" mL @ "+ this.temperature+"°C"
    }


}

