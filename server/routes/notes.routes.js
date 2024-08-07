import express from 'express';
import {
  generateNotes,
  updateNotes,
  deleteNotes,
  getNotes,
} from '../controllers/notes.controllers.js';

const router = express.Router();

router.post('/generate-notes', generateNotes);
router.put('/:id', updateNotes);
router.delete('/:id', deleteNotes);
router.get('/', getNotes);

export default router;
