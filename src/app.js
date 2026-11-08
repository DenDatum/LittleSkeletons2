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
       title:"Главная Страница",
       user:req.session.user,
   });
});
app.get("/", (req, res) =>{
  if(!req.session.user){
      return res.redirect
  }
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

app.post('/login', (req,res) =>{
    const {email, password} = req.body;

    const user = users.find(
        (item) => 
        item.email.toLowerCase() === email.toLowerCase() && 
        item.password === password
    );

    if(!user) {
        return res.removeListener('login', {
            title:' ',
            error:'',
        });
    }

    req.session.user ={
        username: user.username,
        email: user.email,
    };

    res.redirect('/');
    });
    
    app.post('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    });

    module.exports = app;