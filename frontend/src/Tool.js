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
    constructor(name="Scale",image,weight=453.592,unit='g',size = 300)
    {
        super(name,image,weight,unit,size);
        this.value = 5;
        this.capacity = 3000;
        this.svgArgs =
            {
                value: this.value,
                size: size,
                zero: this.zero,
            };
    }
    zero(){
        this.value=0;
        alert(this.value);
    }

}