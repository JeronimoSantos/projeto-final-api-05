import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import empresaRoutes from './empresaRoutes.js';
import vagaRoutes from './vagaRoutes.js';
import candidaturaRoutes from './candidaturaRoutes.js';
import acessibilidadeRoutes from './acessibilidadeRoutes.js';

const router = Router();

// Agrupa todas as rotas
router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);
router.use('/vagas', vagaRoutes);
router.use('/candidaturas', candidaturaRoutes);
router.use('/acessibilidade', acessibilidadeRoutes);

export default router;