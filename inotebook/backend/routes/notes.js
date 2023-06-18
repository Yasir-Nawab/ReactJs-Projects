const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
// requiring Validation
const { body, validationResult } = require("express-validator");
// require fetchuser middleware
const fetchuser = require("../middleware/fetchuser");

// Route1: Get all the notes of a loggedIn user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route2: Add a new note for a loggedIn user
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),],async (req, res) => {
        try {
            const {title, description,tag}=req.body;      
            //If there are errors, return bad request and the errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.send({ errors: result.array() });
            }

            const note = new Notes({
                title,description,tag,user: req.user.id
            })
            const saveNotes = await note.save();
            res.send(saveNotes);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//Route3: Update an existing note for a loggedIn user
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
    const {title, description, tag} = req.body;
    try {
        // Create a newNote Object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // find the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")};

        // Varify that owner of the notes is updating note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        // Now Owner can update his notes
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.send(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route4: Delete an existing note for a loggedIn user
router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
    try {
        // find the note to be delete
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")};

        // Varify that owner of the notes is deleting note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        // Now Owner can delete his notes
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send({"success":"Deleted Successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;
