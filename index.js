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
    text: [],
    posts: ["Lorem ipsum note dare ate"],
    postContent: null,
    postIndex: null
}
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/login-data", (req, res) => {
    if (req.body.uName === "Admin" && req.body.psw === "admin") {
        data.admin = true;
        console.log("Admin password correct");
        res.render("blog.ejs", data);
    }
    else {
        data.admin = false;
        console.log("Admin data incorrect");
        res.redirect("/");
    }
});

app.get("/login", (req, res) => {
    if (data.admin === true) {

        res.render("blog.ejs", data);
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

app.post("/new-post", (req, res) => {
    const newPost = req.body.newpost;
    data.posts.push(newPost);
    res.redirect("/login");
})

app.get("/edit", (req, res) => {
    data.postIndex = req.query.postindex;
    data.postContent = req.query.postcontent;
    console.log(data.postIndex + data.postContent)
    res.render("edit.ejs", { data })
})
app.post("/update",(req,res)=>{
    const update = req.body.editpost;
    data.admin=true;
    data.posts[data.postIndex]=update;   
    res.render("blog.ejs",data)
   })

   app.post("/delete",(req,res)=>{
    const whichPost = req.body.value;
    data.posts.pop(whichPost);
    res.redirect("/login");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});