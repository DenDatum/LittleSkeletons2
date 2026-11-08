import { DESTRUCTION } from 'dns';
import express from 'express';
import { write, writeFile } from 'fs';
import { userInfo } from 'os';
import router from './routes/tasks.js';
import tasksRouter from "./routes/tasks.js";
const fs = require('fs/promise');
const {engine} = require("express-handlebars");
const path = require("path");
const products = require("./data/prodicts");
handlebars.registrerPartials(__dirname + "/views/partals");
app.get("/products", (req, res) => {
res.render("products", {
    title:"CT",
    products: products
});
});

app.engine(
    'handlebars',
    engine({
        extname: '.handlebars',
        defaultLayout:'main',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views',' partials'),
    })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'public')));

const app = express();

app.use(express.json());

app.use('/tasks', tasksRouter);

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.use(express.static(
 path.join(__dirname,"../public")
));
app.get("/", (req, res) =>{
   res.render("home", {
       title:"Главная Страница"
   });
});
app.get("/", (req, res) =>{
    res.render("about", {
        title:"1 Страница",
        DESTRUCTION:"Бум-бум-бум"
    });
 });


 app.get("/login", (req, res) =>{
    res.render("login", {
        title:"Войти",
        DESTRUCTION:""
    });
 });

 app.get("/registration", (req, res) =>{
    res.render("registration", {
        title:"Регестрация",
        DESTRUCTION:""
    });
 });

 router.post("/registration", async(req, res) =>{
     try{
         const {reglog, regpas1, regpas2 } = req.body;
    
      
     const users = await readData();
     const namedate = users.find(u => u.reglog === reglog); 
      
      if(namedata){
          return res.render('registration', {error:'-'}); //пользователь имя есть 
      }

      if(regpas1 === regpas2) {
          return res.render('registration', {reglog});
      }

      const hashedpass = await bcrypt.hash(regpas1, 10);
      const newUser ={
          "id": Date.now().toString, //Крутые цифры!
          "name":reglog,
          "password":hashedpass
      };
      users.push(newUser);
      await writeFile(newUser);
      
 }catch(error){
    return res.render('registration', {error:'-'}); 
    }
 });


 router.post("/login", async(req, res) =>{
    try{
        const {loglog, logpas} = req.body;
    const users = await readData();
    const namedate = users.find(u => u.loglog === loglog); 
    const pasdate = await bcrypt
    if(namedata ){
        
    } else{
        return error();
    }
    
     
}catch(error){
   return res.render('registration', {error:'-'}); 
   }
});

 const sortedProducts = [...products].sort((a,b) => a.price - b.price);
app.listen(3000, () => {
    console.log("Cервер запущен: http://localhost:3000");
});
export default app;