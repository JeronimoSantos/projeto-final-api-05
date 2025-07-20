import { Router } from 'express';
import { 
  login, 
  logout, 
  getCurrentUser, 
  refreshToken 
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { Usuario } from '../models/index.js';
import bcrypt from 'bcrypt';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login, logout e registro de usuários
 */

// Rota de login
// Rota de logout
router.post('/logout', logout);

// Rota para renovar o token de acesso
router.post('/refresh-token', refreshToken);

// Obter informações do usuário atual (requer autenticação)
router.get('/me', authenticateToken, getCurrentUser);

// Rota de registro
router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo, deficiencia } = req.body;
  
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha,
      tipo,
      deficiencia
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Credenciais inválidas
 *       429:
 *         description: Muitas tentativas. Tente novamente mais tarde.
 */
router.post('/login', loginLimiter, login);

export default router;
