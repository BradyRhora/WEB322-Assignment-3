const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const multer = require("multer");
const upload = multer();

const app = express();
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.get("/login", (req,res) => {
    res.render('login', {title:'BradyHosting Login'});
});

app.post("/login-user", upload.none(), (req, res) => {
    const specChars = /[!?<>!@#$%^&*(){}\\|\[\]]/;
    const data = req.body;
    if (data.email && data.password){
        res.json({success:true});
    } else
        res.json({error: "missing_vals", error_msg:"Please fill in email and password"});
});

app.get("/dashboard", (req, res) =>{
    res.render('dashboard');
});

app.get("/registration", (req,res) => {
    res.render('registration');
});

app.post("/register-user", upload.none(), (req,res) =>{
    const data = req.body;
    const formVals = [ data.firstName, data.lastName, data.email, data.phone, data.address, data.city,data.province,data.postal,data.country,data.password,data.password2 ];
    
    if (formVals.some(x=>!x))
    {
        res.json({error: "missing_vals", error_msg:"Please fill in all required fields."});
    }
    else {
        const phonePattern = /([0-9]{3}-){2}[0-9]{4}/;
        const passPatterns = [/[!?<>!@#$%^&*]/, /.{8}/, /[0-9]/];

        let passMatch = passPatterns.every(x=>x.test(data.password));
        
        if (!phonePattern.test(data.phone)) 
            res.json({error:"phone",error_msg:"Phone format must be like: 123-456-7890"});
        else if (!passMatch) 
            res.json({error:"password",error_msg:"Password must contain at least: 8 characters, 1 number, and 1 symbol (!?<>!@#$%^&*)"});
        else if (data.password != data.password2)
            res.json({error:"password",error_msg:"Both password fields must match."});
        else{
            res.json({success:true});
        }
        
    }
});

app.get("/blog", (req,res) => {
    res.render('blog');
});
app.get("/article/:id", (req,res) => {
    res.render('read_more');
});

app.listen(HTTP_PORT);