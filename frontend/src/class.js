
// Initializing a class definition
class Step {
    constructor(index, instruction, workspace) {
        this.index = index;
        this.instruction = instruction;
        this.workspace = workspace;
        this.next = null;
    }
}

class Workspace {
    constructor(){
        this.equipments = []
    }
}

