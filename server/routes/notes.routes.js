import express from 'express';
import {
  generateNotes,
  updateNotes,
  deleteNotes,
  getNotes,
  getAllNotes,
  saveNotes,
} from '../controllers/notes.controllers.js';

const router = express.Router();

router.post('/generate', generateNotes);
router.post('/save', saveNotes);
router.put('/update/:id', updateNotes);
router.delete('/:videoId/:userId', deleteNotes);
router.get('/:notesId', getNotes);
router.get('/all/:userId', getAllNotes);

export default router;
