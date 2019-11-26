// import Workspace from "./Workspace.js";
// Initializing a class definition


import Glassware from "./Glassware";

export default class Equipment {
    get temperature() {
        return this._temperature;
    }

    set temperature(value) {
        this._temperature = value;
    }
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = value;
    }

    constructor(name,image,weight, state=0,)
    {


        this._name = name;
        this.weight = weight;
        this._amount=0;
        this.unit="";
        this._capacity=0;
        this._temperature=15;
        this._state=state;
        this._image=image;
        this._items=[];
        this._disabled = false;
    }



    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(value) {
        this._capacity = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }
    item_exist(item){
        const array = this._items;

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
        const array = this._items;
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
        this._items.push(item);
    }
    add_items(items){
        this._items.concat(items);
    }

    toString()
    {
        return this._name;
    }


    canInteract(target)
    {
        return false;

    }


}





// export default Equipment;

// var water = new Element('water',100);
// var water2 = new Element('water',99);
//
// var beaker = new Glassware('beaker',250);
// beaker.add_item(water);
// beaker.add_item(water2);
// // console.log(water);
// console.log(beaker);
