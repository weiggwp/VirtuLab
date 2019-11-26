import Equipment from "./Equipment";
import Glassware from "./Glassware";


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

    output(amount){
        // let amount = opt["amount"];
        var out = this.cloneNode();
        if(amount<=0){
            amount=0;
        }
        else if(amount>=this.amount){
            amount = this.amount;
        }
        out.amount=amount;
        this.amount-=amount;
        return out;
    }
    /*
        An element is simply a solution type - can be liquid, solid, or gas
        It can be poured into (can't pour anything into the element's container) glassware and can be weighted
        Since we only have two types of tools - we only exclude bunsun burner - can't heat up simple elements
     */
    canInteract(target)
    {
        if(target instanceof Glassware)
        {
            return target.name !== 'Pipette';
        }
        return target.name === "Scale";

    }
    getActions(target)
    {
        if(target instanceof Glassware)
        {
            return ['pour',this.pour]
        }
        return null;
    }
    pour(target,amount)
    {

        target.add_item(this.output(amount));
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