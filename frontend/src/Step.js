import Workspace from "./Workspace.js";
// Initializing a class definition
class Step {

    constructor(stepNum,instruction, workspace)
    {

        if(stepNum===0) {
            this.initStep()
        }
        else
        {
            //if workspace is not defined, create a new one
            if(!workspace){
                workspace=new Workspace();
            }
            this.init(stepNum,instruction,workspace);

        }
    }
    init(stepNum, instruction, workspace) {
        this.stepNum = stepNum;
        this.instruction = instruction;
        this.workspace = workspace;
    }

    initStep()
    {
        this.stepNum = 0;
        this.instruction = "This is the setup stage. Click on equipments you would like to be available for the duration of the lab (click again to unselect) ";
        this.workspace= new Workspace();

    }
    setInstruction(str){
        this.instruction = str;
    }
    // updateInstruction(stepNum,value)
    // {
    //     // alert("updating instruction at stepNum"+stepNum+" with value: "+value);
    //     var i = 0;
    //     var step = this;
    //
    //     while(i<stepNum)
    //     {
    //
    //         step = step.next;
    //         i = i +1;
    //     }
    //     step.instruction = value;
    //     // alert(step.instruction);
    //
    // }
    // getInstruction(stepNum)
    // {
    //     var i = 0;
    //     var step = this;
    //
    //     while(i<stepNum)
    //     {
    //         step = step.next;
    //         i = i +1;
    //     }
    //     return step.instruction;
    //
    // }
    // addNewStep()
    // {
    //     var current = this;
    //     var stepNum=1;
    //     while(current.next)//while has next
    //     {
    //         current = current.next;
    //         stepNum = stepNum+1;
    //     }
    //
    //
    //     current.next = new Step(stepNum," ",new Workspace(),null);
    //     // alert("added new step"+stepNum);
    //     // this.printSteps()
    // }

    // printSteps()
    // {
    //     var step = this;
    //
    //     while(step)
    //     {
    //         alert(step.stepNum);
    //         step=step.next;
    //     }
    // }

}

export default Step;

