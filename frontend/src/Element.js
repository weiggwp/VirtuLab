import Equipment from "./Equipment";
import Glassware from "./Glassware";
import {functionName} from "./Globals"

export default class Element extends Equipment{
    constructor(name, image ,capacity, weight, state=1)
    {
        super(name,image,weight);
        this.amount=capacity;
        this.capacity=capacity;
        this.image=image;
        this.state=state;
        this.type="Solution"
        this.state_names= ["solid", "liquid", "gas"];

    }
    getWeight(){
        return this.weight * this.amount
    }
    output(amount){
        // let amount = opt["amount"];
        const clone = JSON.parse(JSON.stringify(this));

        if(amount<=0){
            amount=0;
        }
        else if(amount>=this.amount){
            amount = this.amount;
        }
        clone.amount=amount;
        this.amount-=amount;
        return clone;
    }
    /*
        An element is simply a solution type - can be liquid, solid, or gas
        It can be poured into (can't pour anything into the element's container) glassware and can be weighted
        Since we only have two types of tools - we only exclude bunsun burner - can't heat up simple elements
     */
    canInteract(target)
    {
        if(Glassware.prototype.isPrototypeOf(target) )
        {
            return target.name !== 'Pipette';
        }
        return target.name === "Scale";

    }

    getActions(target)
    {
        if(Glassware.prototype.isPrototypeOf(target) )
        {
            return [this.pour.name]
        }
        return null;
    }
    pour(target,amount,callback=null)
    {
        target.add_item(this.output(amount));
        console.log("target");
        console.log(target);
        // if(!callback){
        //     callback("Poured "+amount+" ml of "+this.name + " into " + target.name);
        // }
        alert("Poured "+amount+" ml of "+this.name + " into " + target.name);

    }

    //elements can only be weighted
    interact(target)
    {

        target.value=this.weight;

    }

    toString()
    {
        return this.capacity+" mL "+this.name;
    }
}