import express from "express";
import {
  addNewNoteController,
  deleteNotesByIdController,
  getNotesByIdController,
  getNotesController,
  updateNotesByIdController,
} from "../controllers/NotesControllers.js";

//router object
const router = express.Router();

// GET /notes
router.get("/getNotes", getNotesController);

// GET /notes/:id
router.get("/getNotes/:id", getNotesByIdController);

// POST /notes
router.post("/addnewnote", addNewNoteController);

// PUT /notes/:id
router.put("/addnewnote/:id", updateNotesByIdController);

// DELETE /notes/:i
router.delete("/deletenote/:id", deleteNotesByIdController);

export default router;
