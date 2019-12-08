import Equipment from "./Equipment";
import Glassware from "./Glassware";
import {functionName} from "./Globals"
import {ToastsStore} from "react-toasts";

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
        amount=parseInt(amount)>this.amount?this.amount:parseInt(amount);

        var warning = false;
        var warning_msg = target.name+" is full.";

        if(this.amount===0)
        {
            ToastsStore.warning(this.name+"is empty")
            return
        }
        /*
        if pouring more than the target can contain, set amount to target.capacity-target.amount
         */
        if(amount+target.amount>=target.capacity)
        {
            //cannot pour anymore
            amount=parseInt(amount)>target.amount?(target.capacity-target.amount):parseInt(amount);
            console.log("pouring more than enough");
            warning=true;
            ToastsStore.warning(target.name+" is full")


        }
        if(amount>0)
        {

            target.add_item(this.output(parseInt(amount)));
            target.amount += amount;
            console.log("target");
            console.log(target);
            // if(!callback){
            //     callback("Poured "+amount+" ml of "+this.name + " into " + target.name);
            // }
            // alert("Poured "+amount+" ml of "+this.name + " into " + target.name);
            var success = "Poured " + amount + " ml of " + this.name + " into " + target.name;
            if(!warning)
                ToastsStore.success(success)
            else
                ToastsStore.warning(warning_msg+" "+success)
        }

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