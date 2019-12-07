import Equipment from "./Equipment";


export default class Tool extends Equipment{

    constructor(name,image,weight=0,svg=null)
    {
        super(name,image,weight,"Tools",0,svg);
        this.name = name;
        this.image=image;
        this.disabled = false;
        // this.type="Tools";
        this.setVal();

    }

    setVal() {
        if (this.name === "Scale")
            this.value = 0;
        else
            this.value = 15;//room temperature


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