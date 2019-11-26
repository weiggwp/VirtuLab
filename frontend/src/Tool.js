import Equipment from "./Equipment";


export default class Tool extends Equipment{

    constructor(name,image)
    {
        super(name,image);
        this._name = name;
        this._image=image;
        this._disabled = false;
        this.setVal()
    }

    setVal()
    {
        if (this._name === "Scale")
            this._value=0
        else
            this._value=15;//room temperature


    }
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
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
        return this._name;
    }
}