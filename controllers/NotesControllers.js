import mongoose from "mongoose";
import Note from "../models/NotesModel.js";
import ErrorHandler from "../utils/errorHandler.js";
//GET All Notes
export const getNotesController = async (req, res, next) => {
  try {
    const note = await Note.find();
    if (!note) return next(new ErrorHandler("Notes not found", 404));
    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

//GET Notes by id
export const getNotesByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;

    //check id is valid or note
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new ErrorHandler("Invalid Note ID", 400));

    const note = await Note.findById(id);
    if (!note) return next(new ErrorHandler("Note not found", 404));

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

//POST notes
export const addNewNoteController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    //check title
    if (!title) return next(new ErrorHandler("Please add Title", 400));
    //check description
    if (!description)
      return next(new ErrorHandler("Please add Description", 400));

    const note = await Note.create({ title, description });

    note.save();

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};
//put note
export const updateNotesByIdController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const checkId = mongoose.Types.ObjectId.isValid(id);
    if (!checkId) return next(new ErrorHandler("Invalid Note ID", 400));

    const updateNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updateNote) return next(new ErrorHandler("Note not found", 404));

    res.status(200).json({
      success: true,
      updateNote,
    });
  } catch (error) {
    next(error);
  }
};

//delete note
export const deleteNotesByIdController = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return next(new ErrorHandler("Note not found", 404));

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    //handele the error
    next(error);
  }
};
