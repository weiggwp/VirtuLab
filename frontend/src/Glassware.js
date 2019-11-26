import Equipment from "./Equipment";


export default class Glassware extends Equipment{
    constructor(name,image, capacity, weight, state=0)
    {
        super(name,image,weight, state);
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
    toString()
    {
        return this._capacity+" mL "+this._name;
    }

}
