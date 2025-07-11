import express from 'express';
import {
  criarEmpresa,
  listarEmpresas,
  buscarEmpresa,
  atualizarEmpresa,
  removerEmpresa
} from '../controllers/empresa.controller.js';

const router = express.Router();

// CRUD Routes
router.post('/', criarEmpresa);
router.get('/', listarEmpresas);
router.get('/:id', buscarEmpresa);
router.put('/:id', atualizarEmpresa);
router.delete('/:id', removerEmpresa);

export default router;