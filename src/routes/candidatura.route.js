import express from 'express';
import {
    createCandidatura,
    getCandidaturas,
    getCandidaturaById,
    updateCandidatura,
    deleteCandidatura
} from '../controllers/candidatura.controller.js';

const router = express.Router();

router.post('/', createCandidatura);
router.get('/', getCandidaturas);
router.get('/:id', getCandidaturaById);
router.put('/:id', updateCandidatura);
router.delete('/:id', deleteCandidatura);

export default router;
