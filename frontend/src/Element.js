import Equipment from "./Equipment";


export default class Element extends Equipment{
    constructor(name, image ,capacity, weight, state=1)
    {
        super(name,weight);
        this.amount=capacity;
        this.capacity=capacity;
        this.image=image;
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
    toString()
    {
        return this._capacity+" mL "+this._name;
    }
}