import Glassware from "./Glassware";


export class mediator{

    popup(eq1, eq2){
        let opt = [];
        if(eq1 instanceof Element && eq2 instanceof Glassware){
            opt["amount"] = 0.0;
            return opt;
        }
        if(eq1 instanceof Glassware && eq2 instanceof Glassware){
            opt["amount"] = 0.0;
            return opt;
        }
    }

    intereact(eq1,eq2,opt){
        if(eq1 instanceof Element && eq2 instanceof Glassware){
            eq2.input(eq1.output(opt));
            return true;
        }
    }




}