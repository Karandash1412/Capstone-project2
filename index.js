// Back-end
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



const data = {
    admin: false,
    fullName: [],
    email: [],
    text: []
}
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/login-data", (req, res) => {
    if (req.body.uName === "Admin" && req.body.psw === "admin") {
        data.admin = true;
        console.log("Admin password correct");
        res.render("blog.ejs",data);
    }
    else {
        data.admin = false;
        console.log("Admin data incorrect");
        res.redirect("/");
    }
});

app.get("/login", (req, res) => {
    if (data.admin === true) {
        res.render("blog.ejs");
    } else {    
        res.render("login.ejs");
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/submit", (req, res) => {
    const newSubmit = req.body.name;
    data.fullName.push(newSubmit);
    const newEmail = req.body.email;
    data.email.push(newEmail);
    const newText = req.body.text;
    data.text.push(newText);

    console.log(data.fullName + data.email + data.text);

    res.render("submit.ejs", {
        fullName: req.body["name"],
        email: req.body["email"],
        text: req.body["text"]
    });

});
app.post("/submit/edit", (req, res) => {
    res.render("submit.ejs", {
    });
});
app.delete("/submit/delete", (req, res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});