import express from 'express';
import {
  generateNotes,
  updateNotes,
  deleteNotes,
  getNotes,
  saveNotes,
} from '../controllers/notes.controllers.js';

const router = express.Router();

router.post('/generate', generateNotes);
router.post('/save', saveNotes);
router.put('/:id', updateNotes);
router.delete('/:videoId/:userId', deleteNotes);
router.get('/:videoId/:userId', getNotes);

export default router;
