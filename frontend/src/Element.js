import Equipment from "./Equipment";


export default class Element extends Equipment{
    constructor(name, amount, weight, state=1)
    {
        super(name,weight);
        this.amount=amount;
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
}