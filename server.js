// build basic structure.
const path = require("path");
const express = require("express");
const app = express(); 
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// data stucture
let dbData = fs.readFileSync(path.join(__dirname,"/db.json"),"utf8");
dbData = JSON.parse(dbData);
console.log(dbData);

let notesData = dbData.notes || [];

// i need to find a way to give each note a unique id when it is saved
// then to delete a note i need to read of the notes from the db.json, then remove the note with the given id property and rewrite the notes to the db.json file

// this is route that sends back the homepage
app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname+"/public/index.html"))
});
// route get /notes to go to notes.html

// route get /api/notes that will read the db.json file and return all saved notes to JSON
app.get("/api/notes", function(req,res){
    res.json(notesData);
});

// route delete /api/notes/:id that will recieve a query perameter containing the id of a note to delete.
app.get("/api/notes/:id", function(req,res){
    notesData=[];
    const emptyDbSchema = {
        notes:[],
    }
    fs.writeFileSync(path.join(__dirname,"/db.json"), JSON.stringify(emptyDbSchema))

    res.send("DELETED");
})
// route post api/notes this will recieve the new note to save onto the request body, then will add it to the db.json, and will return the new note to the cliant
app.post("/api/notes", function(req,res){
    

//    notesData.push(req.body)
   res.json(req.body);
   notesData.push(req.body)

//    whenever i get a new piece of data, push it to the array and then over write the data in db.json
   const newDbState = {
       notes:notesData
   }

   fs.writeFileSync(path.join(__dirname,"/db.json"), JSON.stringify(newDbState))
})


app.listen(PORT, function(){
    console.log("listen on port " +PORT)
})
