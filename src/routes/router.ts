import { Router } from "express";
import * as  todoController from "../controller/todoController";


const todoRouter = Router()



todoRouter.get('/',todoController.getTodo)

todoRouter.get('/getAllTask',todoController.getAllTask);

todoRouter.post('/addTask',todoController.addTask);

todoRouter.put('/editTask/:id',todoController.editTask)

todoRouter.patch('/toggleDone/:id',todoController.toggleDone)

todoRouter.delete('/deleteTask/:id',todoController.deleteTask)

export default todoRouter;