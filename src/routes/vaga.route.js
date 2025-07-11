import express from 'express';
import {
  getAllVagas,
  getVagaById,
  createVaga,
  updateVaga,
  deleteVaga
} from '../controllers/vaga.controller.js';

const router = express.Router();

// Rotas de CRUD de Vagas
router.get('/', getAllVagas);
router.get('/:id', getVagaById);
router.post('/', createVaga);
router.put('/:id', updateVaga);
router.delete('/:id', deleteVaga);

export default router;


