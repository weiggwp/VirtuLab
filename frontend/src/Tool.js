import Equipment from "./Equipment";


export default class Tool extends Equipment{

    constructor(name,image,weight=200,unit='',size = 200)
    {
        super(name,image,weight,"Tools",0,size);
        this.name = name;
        this.image=image;
        this.disabled = false;
        this.capacity = 3000;
        this.unit=unit;
        this.setVal();

    }

    setVal() {
        if (this.name === "Scale")
            this.value = 0;
        else
            this.value = 15;//room temperature


    }
    getFillPercent(){
        return this.value;
    }

    getSvgArgs(){
        return  {
            value: this.value,
            size: this.size,
            zero: this.zero,
            obj: this,

        };
    }

    /*
        A tool is either a scale or a bunsun burner
        it can be interacted with but cannot interact with other types of equipment
     */
    canInteract(target)
    {
        return false;

    }


    toString()
    {
        return this.name;
    }


}

export class Scale extends Tool{
    constructor(name="Scale",image,weight=453.592,unit='g',size = 200)
    {
        super(name,image,weight,unit,size);
        this.value = 0;
        this.capacity = 3000;
        this.type = name;
        this.offset =0;
    }
    zero(){
        this.offset +=this.value;
        this.value=0;
    }
    toStateString()
    {
        return " "
    }
    setValue(v){
        this.value = v;
    }
    removeItems(){
        this.items=[];
        this.offset=this.value=0;
    }
    add_item(item) {
        this.value = item.getWeight();
        super.add_item(item);
    }


}

export class BunsenBurner extends Tool{
    constructor(name="Bunsen Burner",image,weight=215,unit='°C',size = 200)
    {
        super(name,image,weight,unit,size);
        this.value = 15;
        this.type = name;
    }

    toStateString()
    {
        return this.temperature+"°C"
    }

}