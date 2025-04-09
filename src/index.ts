import express, { urlencoded } from "express";
import todoRouter from "./routes/router";
import dotenv from 'dotenv'
import path from 'path'

const app = express();
dotenv.config();
const PORT = process.env.PORT;


app.set('view engine','ejs');
app.set("views",path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname,'./src/public')))
app.use(express.static(path.join(__dirname,'./dist/public')))

app.use('/',todoRouter)


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})