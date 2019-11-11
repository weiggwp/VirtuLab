import Workspace from "./Workspace.js";
// Initializing a class definition
class Step {

    constructor(index)
    {
        if(index===0) {
            this.initStep()
        }
        else
        {
            this.init(index,"",new Workspace());

        }
    }
    init(index, instruction, workspace) {
        this.index = index;
        this.instruction = instruction;
        // this.workspace = workspace;
        this.next = null;
    }

    initStep()
    {
        this.index = 0;
        this.instruction = " ";
        // this.workspace= new Workspace();
        this.next=null;

    }

    updateInstruction(index,value)
    {
        // alert("updating instruction at index"+index+" with value: "+value);
        var i = 0;
        var step = this;

        while(i<index)
        {

            step = step.next;
            i = i +1;
        }
        step.instruction = value;
        // alert(step.instruction);

    }
    getInstruction(index)
    {
        var i = 0;
        var step = this;

        while(i<index)
        {
            step = step.next;
            i = i +1;
        }
        return step.instruction;

    }
    addNewStep()
    {
        var current = this;
        var index=1;
        while(current.next)//while has next
        {
            current = current.next;
            index = index+1;
        }


        current.next = new Step(index," ",new Workspace(),null);
        // alert("added new step"+index);
        // this.printSteps()
    }

    printSteps()
    {
        var step = this;

        while(step)
        {
            alert(step.index);
            step=step.next;
        }
    }

}

export default Step;

