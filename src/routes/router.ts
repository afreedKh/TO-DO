import { Router } from "express";
import * as  todoController from "../controller/todoController";


const todoRouter = Router()



todoRouter.get('/',todoController.getTodo)


export default todoRouter;