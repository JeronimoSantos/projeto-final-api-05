// src/routes/index.js
import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import empresaRoutes from './empresaRoutes.js';
import vagaRoutes from './vagaRoutes.js';
import candidaturaRoutes from './candidaturaRoutes.js';
import acessibilidadeRoutes from './acessibilidadeRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);
router.use('/vagas', vagaRoutes);
router.use('/candidaturas', candidaturaRoutes);
router.use('/acessibilidade', acessibilidadeRoutes);
router.use('/auth', authRoutes);

export default router;
