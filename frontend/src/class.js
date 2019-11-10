
// Initializing a class definition
class Step {
    constructor(index, instruction, workspace) {
        this.index = index;
        this.instruction = instruction;
        this.workspace = workspace;
        this.next = null;
    }
    constructor()
    {
        this.initStep()
    }

    initStep()
    {
        this.index = 0;
        this.instruction = "";
        this.workspace= new Workspace();
        this.next=null;

    }

    updateInstruction(index,value)
    {
        var i = 0;
        var step = this;

        while(i<=index)
        {
            var instruction = step.instruction;

            step = step.next;
            i = i +1;
        }
        step.instruction = value;

    }
    addNewStep()
    {
        var hasNext = this.next;
        var index=1;
        while(hasNext)
        {
            hasNext = current.next;
            index = index+1;
        }

        hasNext.next = new Step(index,"",new Workspace(),null);
    }

}

class Workspace {
    constructor(){
        this.equipments = []
    }
}

