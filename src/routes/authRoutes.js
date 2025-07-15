import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index';

const router = Router();
const JWT_SECRET = 'chave-secreta';

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e registro de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Usuário já existe
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo, deficiencia } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
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
 *     summary: Faz login e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Usuário não encontrado ou senha incorreta
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
});

export default router;
