interface TaskManager {
    id: number;
    title: string;
    status: 'done' | 'pending';
}


document.addEventListener('DOMContentLoaded',()=>{
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
    const taskList = document.getElementById('taskList') as HTMLUListElement

    fetchTask()

    addBtn.addEventListener('click',()=>{
        
        const title = taskInput.value.trim();
        if(title){
            addTask(title)
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        const title = taskInput.value.trim();
        if (e.key === 'Enter') {
            addTask(title);
            taskInput.value = '';
        }
    });
    


    async function fetchTask(){
        try {
            const response = await fetch('/getAllTask')
            const tasks:TaskManager[] = await response.json()
            renderTask(tasks)
        } catch (error) {
            console.error('fetchTask error',error);
            
        }
    }

    function renderTask(tasks:TaskManager[]) {
        taskList.innerHTML = '';
        tasks.forEach((task:TaskManager) => appendTask(task));
    }

    // Adding Task API

    async function addTask(title:string){
        try {
            const response = await fetch('/addTask',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title})
            })
            
            const newTask:TaskManager =await response.json()
            appendTask(newTask);
        } catch (error) {
            console.error('addTask failed',error);

        }
    }

    async function editTask(id:number,title:string) {
        try {
            const response = await fetch(`/editTask/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({title})
            })
            const updateTask:TaskManager = await response.json()
            updateTaskInDOM(updateTask)

        } catch (error) {
            console.error('editTask error',error);
            
        }
    }

    async function toggleTaskStatus(id:number){
        try {
            const response = await fetch(`/toggleDone/${id}`,{
                method:'PATCH',
                
            });
            const updatedTask:TaskManager =await response.json()
            updateTaskInDOM(updatedTask);
            
        } catch (error) {
            console.error('toggleTaskStatus error',error);
        }
    }

    async function deleteTask(id:number){
        try {
            const response =await fetch(`/deleteTask/${id}`,{
                method:'DELETE',
            })
         
            const deleted:number = await response.json()
            if(deleted) window.location.reload()
           
        } catch (error) {
            console.error('deleteTask error',error);
            
        }
    }
    
    function appendTask(task:TaskManager){
        const li = document.createElement('li') as HTMLLIElement
        li.id = `task-${task.id}`;
        li.className = task.status === 'done' ? 'done' :'pending';

        const checkbox = document.createElement('input') as HTMLInputElement
        checkbox.type = 'checkbox';
        checkbox.checked = task.status === 'done';
        checkbox.className = 'task-checkbox';
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id));

        const taskText = document.createElement('span') as HTMLSpanElement
        taskText.className = 'task-text';
        taskText.textContent = task.title

        if (task.status === 'done') {
            taskText.style.textDecoration = 'line-through';
        }

        const actions = document.createElement('div') as HTMLDivElement
        actions.className = 'actions';

        

        const editBtn = document.createElement('button') as HTMLButtonElement
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click',()=>{
            const newTitle = prompt('Edit task : ',task.title)
            if(newTitle && newTitle.trim()){
                editTask(task.id,newTitle.trim())
            }
        })

        

        const deleteBtn = document.createElement('button') as HTMLButtonElement
        deleteBtn.className = 'delete-task';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click',()=>{
            deleteTask(task.id)
        })

        li.appendChild(checkbox);
        li.appendChild(taskText);
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);
        
        taskList.appendChild(li);
    }

    

    function updateTaskInDOM(task:TaskManager){
        const li = document.getElementById(`task-${task.id}`)
        if(li){
            li.className = task.status === 'done'?'done' : 'pending';

            const taskText = li.querySelector('.task-text') as HTMLElement
            taskText.textContent = task.title;
            taskText.style.textDecoration = task.status === 'done' ? 'line-through' : 'none';

            const checkbox = li.querySelector('.task-checkbox') as HTMLInputElement;
            checkbox.checked = task.status === 'done';
        }
        window.location.reload()
    }


})
