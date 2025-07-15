import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { Usuario } from '../models/index.js';
import bcrypt from 'bcrypt';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e registro de usuários
 */

// Login (única definição)
router.post('/login', login);

// Registro
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

export default router;
