// build basic structure.
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// data stucture
let dbData = require("./db.json");
// dbData = JSON.parse(dbData);

let notesData = dbData.notes || [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));

});
// this is route that sends back the homepage
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// route get /api/notes that will read the db.json file and return all saved notes to JSON
app.get("/api/notes", function (req, res) {
    res.json(notesData);
});

// route delete /api/notes/:id that will recieve a query perameter containing the id of a note to delete.
app.get("/api/notes/:id", function (req, res) {
    notesData = [];
    const emptyDbSchema = {
        notes: [],
    }
    // fs.writeFileSync(path.join(__dirname, "/db.json"), JSON.stringify(emptyDbSchema))
    // res.send("DELETED");
})
// route post api/notes this will recieve the new note to save onto the request body, then will add it to the db.json, and will return the new note to the cliant
app.post("/api/notes", function (req, res) {
    // console.log(req.body);
    const newNote = {
        id: Date.now(),
        title: req.body.title,
        text: req.body.text
    }
    notesData.push(newNote);
    const newDbState = {
        notes: notesData
    }
    fs.writeFile(path.join(__dirname, "/db.json"), JSON.stringify(newDbState), function(err, data){
        if (err) throw err;
   
    res.send("note added")
});
});
app.delete("/api/notes/:id" , function (req,res){
const id = req.params.id;
//const data = dbData.notes;

var newData  
if (notesData.length > 0) {
    newData = notesData.filter(note => String(note.id) != id)
    const newDbState = {
        notes: newData
    }
    fs.writeFile(path.join(__dirname, "/db.json"), JSON.stringify(newDbState), function(err){
        if (err)
    throw err});
    res.json(newData);
    notesData = [...newData];

}else {console.log("no data")
res.json("no data");
}
console.log(newData)

});
app.listen(PORT, function () {
    console.log("listen on port " + PORT)
})
