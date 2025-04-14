type Status = "pending" | "done"

abstract class TodoModel{
    public id : number;
    public title : string;
    public status : Status;
    constructor(id:number, title:string, status:Status){
        this.id = id;
        this.title = title;
        this.status = status;
    }
}

export class Task extends TodoModel{}



export class TaskManager{
    private tasks:TodoModel[] = []
    private id :number = 1;

    getAllTask():TodoModel[]{
        return this.tasks
    }

    addTask(title:string):TodoModel{
        let task = new Task(this.id++,title,'pending')
        this.tasks.push(task)
        return task
    }

    getTaskById(id:number):TodoModel|undefined{
        return this.tasks.find((item:TodoModel)=>item.id===id)
    }

    editTask(id:number,title:string):void{
        let idExists = this.getTaskById(id)
        if(idExists){
            idExists.title = title
        }
    }

    deleteTask(id:number):void{
        const index = this.tasks.findIndex((item) => item.id == id);
        this.tasks.splice(index, 1);
    }

    completedTask(id:number){
        let task = this.getTaskById(id)
        if(task){
            if(task.status==='pending'){
                task.status='done';
            }else{
                task.status = 'pending'
            }
        }
    }
}

