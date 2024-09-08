
import express from 'express';
import {
  createSection,
  updateSection,
  deleteSection,
  getSections,
} from '../controllers/section.controllers.js';

const router = express.Router();

router.post('/', createSection);
router.put('/:id', updateSection);
router.delete('/:id', deleteSection);
router.get('/', getSections);

export default router;
