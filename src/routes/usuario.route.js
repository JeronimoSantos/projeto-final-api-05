import express from 'express';
import {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;

