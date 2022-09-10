const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.listen(3000);

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://med:allahommairhamna@cluster0.7zp3rzt.mongodb.net/Database0?retryWrites=true&w=majority").catch(()=>{console.log("Error!");});
const schema = mongoose.Schema({column1:{type:"String", required:true}, column2:"String"});
const model = mongoose.model('collection0', schema);

app.get("/",(req,res)=>{res.render("home", {title:"Home"});});
app.get("/form",(req,res)=>{res.render("form", {title:"Form"});});
app.get("/data",(req,res)=>{
    model.find().sort({_id:-1})
    .then((data)=>{res.render("data", {title:"Data", data})});
});
app.get("/:id", (req,res)=>{
    model.findById(req.params.id)
    .then((data)=>{res.render("details", {title:"Details", data})})
    .catch((err)=>res.status(404).render("404", {title:"404"}));
});
app.get("/delete/:id", (req,res)=>{
    model.findByIdAndDelete(req.params.id)
    .then(()=>res.redirect("/data"))
    .catch(()=>res.redirect("/data"));
});

app.get("/update/:id", (req,res)=>{
    //model.updateOne({ _id: req.params.id }, { $set: { column1: 'foo' } })
    //({name: "Annu"}, {$set:{age:25}});
    model.collection.updateOne({_id: '631b5a07c9634ce248ffa92a'}, {$set:{column2:'9999999999s'}});
});

app.post("/data", (req,res)=>{
    const row = new model(req.body);
    row.save().then(()=>res.redirect("data"));
});

app.use((req,res)=>{res.status(404).render("404", {title:"404"});});