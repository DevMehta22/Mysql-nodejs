const {getNotes,getNoteById,createNote,updateNote,deleteNote} = require('./controllers');
const express = require('express');
const router = express.Router();

// GET /api/users -> get all users
router.get('/notes',getNotes);
//GET /api/user/:id -> get user by id
router.get('/notes/:id',getNoteById);
//POST /api/user -> create a new user
router.post('/notes',createNote);
//PUT /api/user:id -> update an existing user
router.put('/notes/:id',updateNote);
//DELETE /api/user:id -> delete a user with the given id
router.delete('/notes/:id',deleteNote);

module.exports=router;

