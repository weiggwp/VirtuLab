import Equipment from "./Equipment";
import Glassware from "./Glassware";
import {functionName} from "./Globals"
import {ToastsStore} from "react-toasts";

import deepCloneWithType from "./clone"

export default class Element extends Equipment{

    constructor(name, image ,capacity, weight, state=1,size=100,chemProp=name,amount=capacity)
    {
        // console.log("creating ", name, image ,capacity, weight, state,size,chemProp,amount);
        super(name,image,weight,"Solution",0,size);
        this.amount=amount;
        this.capacity=capacity;
        this.chemProp=chemProp;
        // this.chemProp=(chemProp!== undefined)? "chemProp":"name";
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

        // const clone = JSON.parse(JSON.stringify(this));
        const clone = deepCloneWithType(this);
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
        // console.log(amount);
        amount=amount>this.amount?this.amount:amount;

        // console.log(amount);

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
        // console.log(amount+" "+target.amount+" "+target.capacity);
        if(this.amount<amount){
            amount = this.amount;
        }

        if(amount+target.amount>=target.capacity)
        {
            // console.log("target", target);
            //cannot pour anymore
            amount=amount>target.amount?(target.capacity-target.amount):amount;
            warning=true;
            ToastsStore.warning(target.name+" is full")
            target.amount=target.capacity;
            target.add_item(this.output(amount));
            return null;

        }
        if(amount>0)
        {

            target.add_item(this.output(amount));
            target.amount += amount;
            // console.log("target");
            // console.log(target);
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
        if(this.chemProp)
            return this.name+ ((this.name===this.chemProp)? "":" ("+this.chemProp+")");

        return this.name;
    }
}