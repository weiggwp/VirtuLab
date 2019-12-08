import Equipment from "./Equipment";
import Glassware from "./Glassware";
import {functionName} from "./Globals"
import {ToastsStore} from "react-toasts";

export default class Element extends Equipment{
    constructor(name, image ,capacity, weight, state=1,svg=null,size=100)
    {
        super(name,image,weight,"Solution",0,svg,size);
        this.amount=capacity;
        this.capacity=capacity;
        this.image=image;
        this.state=state;
        this.state_names= ["solid", "liquid", "gas"];

    }
    getAmount(){
        return this.amount;
    }
    getFillPercent(){
        return this.amount/this.capacity;
    }
    getWeight(){
        return this.weight * this.amount
    }
    output(amount){

        const clone = JSON.parse(JSON.stringify(this));
        // let clone = Object.assign({}, this);
        //FIXME: Alert: clone loses proto type, isPrototypeOf no longer works

        // console.log(this)
        // console.log(clone)
        // console.log(Element.prototype.isPrototypeOf(this));
        // console.log(Element.prototype.isPrototypeOf(clone));
        // alert()

        if(amount<=0){
            amount=0;
        }
        else if(amount>=this.amount){
            amount = this.amount;
        }
        clone.amount=parseFloat(amount);
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
        amount=amount>this.amount?this.amount:amount;

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
            amount=amount>target.amount?(target.capacity-target.amount):amount;
            console.log("pouring more than enough");
            warning=true;
            ToastsStore.warning(target.name+" is full")


        }
        if(amount>0)
        {

            target.add_item(this.output(amount));
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