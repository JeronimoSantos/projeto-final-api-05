import { Usuario } from '../models/index.js'; 

console.log('Tipo de Usuario:', typeof Usuario.create); // Deve imprimir "function"


// Criar novo usuário
export const createUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body);
    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Listar todos os usuários
export const getUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obter usuário por ID
export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar usuário
export const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.update(req.body);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Deletar usuário
export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
