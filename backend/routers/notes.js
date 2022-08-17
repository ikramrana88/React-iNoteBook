const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Router 1 to fetch all notes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        req.status(500).send("Internal server error")
    }

})

//Route 2 to add a new note
router.post('/addnote', fetchuser, [
    body('title', 'Enter title of atleast 3 character').isLength({ min: 3 }),
    body('description', 'Enter description of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const newNote = await note.save();
        res.json(newNote);

    } catch (error) {
        console.error(error.message);
        req.status(500).send("Internal server error")
    }


})

//Router 3 to update note
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        let updatedNote = {};
        if (title) { updatedNote.title = title };
        if (description) { updatedNote.description = description };
        if (tag) { updatedNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.send(401).send('Not allowes');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: updatedNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


//Router 4 to delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.send(401).send('Not allowes');
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });

    } catch (error) {
        console.error(error.message);
        req.status(500).send("Internal server error")
    }
})


module.exports = router;