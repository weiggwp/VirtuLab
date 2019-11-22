// import Workspace from "./Workspace.js";
// Initializing a class definition


class Equipment {

    constructor(name,weight,state=0)
    {
        this._name = name;
        this.weight = weight;
        this._amount=0;
        this.unit="";
        this._capacity=0;
        this._state=state;
        this._images=[];
        this._items=[];
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

    get images() {
        return this._images;
    }

    set images(value) {
        this._images = value;
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

}

class Element extends Equipment{
    constructor(name, amount, weight, state=1)
    {
        super(name,weight);
        this.amount=amount;
        this.state=state;
        this.state_names= ["solid", "liquid", "gas"];

    }
    output(opt){
        let amount = opt["amount"];
        var out = this.cloneNode();
        if(amount<=0){
            amount=0;
        }
        else if(amount>=this.amount){
            return this;
        }
        out.amount=amount;
        this._amount-=amount;
        return out;
    }
}

class Glassware extends Equipment{
    constructor(name,capacity, weight, state=0)
    {
        super(name,weight,state);
        this.capacity=capacity;
        this.state_names= ["empty", "filled", "full"];

    }
    add_item(item){
        if(this.item_exist(item)){
            // console.log("exist");
            var itemfound = this.find(item);
            // console.log(itemfound);

            itemfound.amount +=item.amount;
        }
        else{
            // console.log("not exist");
            // console.log(item);
            // console.log(this.items);

            this._items.push(item);
        }
    }
    add_items(items){
        for(var item in items)
            this.add_item(items);
    }

    output(amount){
        var percentage = amount/this.amount;
        if(percentage>=1){
            return this.items;
        }
        else if (percentage<=0){
            return null;
        }
        var out=[];
        for (const [key, obj] of Object.entries(this.items)) {
            out[key] = obj.output(obj.amount*percentage);
        }
        return out;
    }
    input(opt){
        if(opt['element']){
            this.add_item(opt['element'])
        }
        if(opt['elements']){
            this.add_items(opt['elements'])
        }
        //TODO: takes in another equipment?

    }

}

class mediator{

    popup(eq1, eq2){
        let opt = [];
        if(eq1 instanceof Element && eq2 instanceof Glassware){
            opt["amount"] = 0.0;
            return opt;
        }
        if(eq1 instanceof Glassware && eq2 instanceof Glassware){
            opt["amount"] = 0.0;
            return opt;
        }
    }
    
    intereact(eq1,eq2,opt){
        if(eq1 instanceof Element && eq2 instanceof Glassware){
            eq2.input(eq1.output(opt));
            return true;
        }
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
