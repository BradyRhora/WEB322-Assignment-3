const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.get("/login", (req,res) => {
    res.render('login', {title:'BradyHosting Login'});
});

app.get("/registration", (req,res) => {
    res.render('registration');
});

app.post("/register-user", (req,res) =>{
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.address || !data.city || !data.province || !data.postal || !data.country || !data.password || !data.password2)
        res.send("missing data");
    else {
        const phonePattern = /([0-9]{3}-){2}[0-9]{4}/;
        if (!phonePattern.test(data.phone)) {
            res.send("BAD PHONE");
        }



        res.send(JSON.stringify(data));
    }
});

app.get("/blog", (req,res) => {
    res.render('blog');
});
app.get("/article/:id", (req,res) => {
    res.render('read_more');
});

app.listen(HTTP_PORT);