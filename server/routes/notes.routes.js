import express from 'express';
import {
  generateNotes,
  updateNote,
  deleteNote,
  getNotes,
} from '../controllers/notes.controllers.js';

const router = express.Router();

router.post('/', generateNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/', getNotes);

export default router;
