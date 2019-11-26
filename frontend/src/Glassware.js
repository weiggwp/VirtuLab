import Equipment from "./Equipment";


export default class Glassware extends Equipment{
    constructor(name,image, capacity, weight, state=0)
    {
        super(name,image,weight, state);
        this.capacity=capacity;
        this.state_names= ["empty", "filled", "full"];


    }
    getWeight(){
        let total = this.weight;
        for (const [key, item] of Object.entries(this.items)) {
            // out[key] = obj.output(obj.amount*percentage);
            console.log("item",item);
            alert(item);
            total+=item.getWeight();
        }
        // this.items.(function (item) {
        //     console.log(item.toString());
        //     alert(item);
        //     total+=item.getWeight();
        // });
        // for(const item in this.items){
        //     total+=item.getWeight()
        // }
        return  total;
    }
    add_item(item){
        if(this.item_exist(item)){
            // console.log("exist");
            var itemfound = this.find(item);
            // console.log(itemfound);

            itemfound.amount +=item.amount;
        }
        else{
            console.log("not exist");
            console.log(item);
            console.log(this.items);

            this.items.push(item);
        }
    }
    add_items(items){
        for(const item in items)
            this.add_item(item);
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
    /*
        A glassware contains a few types of containers - generic glassware (like beakers), plastic containers, and pipettes
        It can be poured into and withdraw from and can be weighted (some, but not all can even be heated)
        Glassware can always interact with other types of glasswares (even when empty, but nothing will happen) except pipettes
        pipettes have to be inserted into glassware to interact
        Glassware cannot pour solutions back into Element types

     */
    canInteract(target)
    {
        var noHeatTypes=['Volumetric Flask','Pipette','Graduated Cylinder'];
        if(Glassware.prototype.isPrototypeOf(target) )
        {
            return target.name !== 'Pipette';
        }
        if(target.name==="Scale")
            return true;
        if(target.name==="Bunsun Burner")
        {
            return !(this.name in noHeatTypes);
        }

        return false;


    }
    getActions(target)
    {
        var actions = [];
        if(Glassware.prototype.isPrototypeOf(target) )
        {
            if(this.name==='Pipette')
            {
                actions.push(this.withdraw.name)
            }
            actions.push(this.pour.name);
            return actions;
        }

        return null;
    }
    pour(target,amount)
    {
        if(amount+target.amount>=target.capacity)
        {
            //cannot pour anymore
            console.log("pouring more than enough");
        }
        else
        {
            target.add_items(this.output(amount));
            target.amount+=amount;
            //also need to account for total volume
            alert("Poured "+amount+" ml from "+this.name + " into " + target.name);

        }

    }

    withdraw(target,amount)
    {
        target.pour(this,amount);
        alert("withdrew "+amount+" ml from "+target.name + " into " + this.name);


    }
    interact(target)
    {
        if(target.name==="Scale")
        {
            target.value=this.getWeight();
            alert(this.name +" is "+ target.value +"g.");
        }
        else
        {
            target.value=this.temperature;
        }

    }
    toString()
    {
        return this._capacity+" mL "+this._name;
    }

}
