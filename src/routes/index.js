import express from 'express';
import usuarioRoutes from './usuario.route.js';
import candidaturaRoutes from './candidatura.route.js';
import empresaRoutes from './empresa.route.js';
import vagaRoutes from './vaga.route.js';

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/candidaturas', candidaturaRoutes);
router.use('/vagas', vagaRoutes);
router.use('/empresas', empresaRoutes);

export default router;
// Aqui você pode adicionar outras rotas principais do seu aplicativo
// Exemplo de rota para listar vagas (precisa de implementação no controller)   
// app.get('/vagas', (req, res) => {
//   res.status(200).json({ message: 'Aqui estarão as vagas exclusivas para PCDs' });
// });
// Mais rotas podem ser adicionadas conforme necessário, como:
// app.use('/vagas', vagasRoutes); // Para agrupar as rotas de vagas, por exemplo.
// Exporte o router para ser usado em app.js
// export default router;