import { Request,Response } from "express"
import { TaskManager } from "../models/tasks";

const taskManger = new TaskManager()

export const getTodo = async (req:Request,res:Response):Promise<void>=>{
    try {
        res.render('index')
    } catch (error) {
        console.error('getTodo error',error);
        res.status(500).send('getTodo error')
    }
}


export const getAllTask = async (req:Request,res:Response):Promise<void>=>{
    try {
        res.json(taskManger.getAllTask())

    } catch (error) {
        console.error('getAllTask error',error);
        res.status(500).send('getAllTask error')
    }
}

export const addTask = async (req:Request,res:Response):Promise<void>=>{
    try {
        const {title} = req.body;
        const newTask = taskManger.addTask(title);
        res.status(201).json(newTask)
    } catch (error) {
        console.error('addTask error',error);
        res.status(500).send('addTask error')
    }
}

export const editTask = async (req:Request,res:Response):Promise<void>=>{
    try {
        const id = Number(req.params.id);
        const {title} = req.body
        taskManger.editTask(id,title)

        res.status(200).json(title)
    } catch (error) {
        console.error('editTask error',error);
        
    }
}

export const deleteTask = async (req:Request,res:Response):Promise<void> =>{
    try {
        const id = Number(req.params.id);
        taskManger.deleteTask(id);
        res.status(200).json(id)
    } catch (error) {
        console.error('deleteTask error',error);
    }
}

export const toggleDone = async(req:Request,res:Response):Promise<void>=>{
    try {
        const id = Number(req.params.id)
        taskManger.completedTask(id)
        res.status(200).json(id)
    } catch (error) {
        console.error('toggleDone error',error);
        
    }
}