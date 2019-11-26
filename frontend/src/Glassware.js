import Equipment from "./Equipment";


export default class Glassware extends Equipment{
    constructor(name,image, capacity,weight, state=0)
    {
        super(name,image,weight);
        this.capacity=capacity;
        this.state_names= ["empty", "filled", "full"];

    }
    setType(type)
    {
        this.type =type;
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
        if(target instanceof Glassware)
        {
            return target.name !== 'Pipette';
        }
        if(target.name==="Scale")
            return true
        if(target.name==="Bunsun Burner")
        {
            return !(this.name in noHeatTypes);
        }

        return false;


    }
    getActions(target)
    {
        var actions = [];
        if(target instanceof Glassware)
        {
            if(this.name==='Pipette')
            {
                actions.push('withdraw',this.withdraw)
            }
            actions.push('pour',this.pour)
        }

        return null;
    }
    pour(target,amount)
    {
        if(amount+target.amount>=target.capacity)
        {
            //cannot pour anymore
            console.log("pouring more than enough")
        }
        else
        {
            target.add_items(this.output(amount))
            target.amount+=amount;
            //also need to account for total volume
        }

    }

    withdraw(target,amount)
    {
        target.pour(this,amount);

    }
    interact(target)
    {
        if(target.name==="Scale")
        {
            target.value=this.weight;
        }
        else
        {
            target.value=this.temperature;
        }

    }
    toString()
    {
        return this.capacity+" mL "+this.name;
    }

}
