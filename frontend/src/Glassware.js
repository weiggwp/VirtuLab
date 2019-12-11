import Equipment from "./Equipment";
import {ToastsStore} from "react-toasts";


export default class Glassware extends Equipment{

    constructor(name,image, capacity,weight, state=0,size=100,amount=0)
    {
        super(name,image,weight,"Glassware",0,size);
        this.capacity=capacity;
        this.amount=amount;
        // this.state_names= ["empty", "filled", "full"];


    }
    setItems(items)
    {
        this.items=items;
    }
    getAmount(){


        let amount = 0;
            // console.log("items:", this.items,"total amount",this.amount);
        for (const [, item] of Object.entries(this.items)) {
            // console.log("item:", item);
            // out[key] = obj.output(obj.amount*percentage);
            amount+=item.amount;
        }
        // console.log("amount:", amount," method over");

        return this.amount;
    }
    getFillPercent(){

        // console.log("getting fill percent");
        return this.getAmount()/this.capacity;
    }
    getWeight(){
        let total = this.weight;
        for (const [, item] of Object.entries(this.items)) {
            // out[key] = obj.output(obj.amount*percentage);
            // console.log("item",item);
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
    setType(type)
    {
        this.type =type;
    }
    overflow_handler(item){
        const total_amount = this.getAmount(); // total = 6500 = (4500+2000)
        if(total_amount>this.capacity){ // capacity = 4500
            item.amount-= total_amount-this.capacity; //4500- 2000
        }
    }
    add_item(item){

        if(this.item_exist(item)){
            // console.log("exist");
            const itemfound = this.find(item);
            // console.log(itemfound);

            itemfound.amount +=item.amount;  //item amount = 2000 + 2500
            this.overflow_handler(itemfound);
        }
        else{
            // console.log(item);
            // console.log(this.items);

            this.items.push(item);
            this.overflow_handler(item);
        }
    }
    add_items(items){
        // console.log("itemss to be added:", items);
        for(let i = 0; i < items.length; i++){

            // console.log("item to be added:", items[i]);
            this.add_item(items[i]);
        }
    }

     output(amount){
        var percentage = amount/this.amount;
        // console.log("percentage",percentage)
        if(percentage>=1){
            this.amount=0;
            return this.items;
        }
        else if (percentage<=0){
            return null;
        }
        var out=[];
        for (const [key, obj] of Object.entries(this.items)) {
            // console.log("obj",obj," percentage",percentage);
            out[key] = obj.output(obj.amount*percentage);
        }
        // console.log("outputting",out)
        this.amount-=amount;
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
    pour(target,amount,pourAction=true)
    {
        amount = parseFloat(amount);
        const tolerance = Number.EPSILON;
        if(Math.abs(this.amount < tolerance))
        {
            ToastsStore.warning(this.name+" is empty");
            return;
        }

        if(this.amount<amount){
            // ToastsStore.warning(this.name+" does not have enough, pouring all of it");
            amount = this.amount;
        }
        if(amount+target.amount>=target.capacity)
        {
            //cannot pour anymore
            // console.log("pouring more than enough");
            ToastsStore.warning(target.name+" is full");

            amount=parseFloat(amount)>target.amount?(target.capacity-target.amount):parseFloat(amount);

        }

        if(amount>0){
            const items = this.output(amount);
            // console.log("items to be added: ", items );
            target.add_items(items);
            target.amount+=amount;
            //also need to account for total volume
            // alert("Poured "+amount+" ml from "+this.name + " into " + target.name);
            if(pourAction)
                ToastsStore.success("Poured "+amount+" ml from "+this.name + " into " + target.name)

        }

    }

    withdraw(target,amount)
    {
        target.pour(this,parseFloat(amount),false);
        // alert("withdrew "+amount+" ml from "+target.name + " into " + this.name);
        ToastsStore.success("Withdrew "+amount+" ml from "+target.name + " into " + this.name)


    }
    interact(target)
    {
        if(target.name==="Scale")
        {
            target.value=this.getWeight();
            // alert(this.name +" is "+ target.value +"g.");
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
