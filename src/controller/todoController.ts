import { Request,Response } from "express"


export const getTodo = async (req:Request,res:Response):Promise<void>=>{
    try {
        res.render('index')
    } catch (error) {
        console.error('getTodo error',error);
        res.status(500).send('getTodo error')
    }
}

