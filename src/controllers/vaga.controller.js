import Vaga from '../models/vaga.model.js';

// Listar todas as vagas
export const getAllVagas = async (req, res) => {
  try {
    const vagas = await Vaga.findAll();
    res.json(vagas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar vagas' });
  }
};

// Criar nova vaga
export const createVaga = async (req, res) => {
  try {
    const vaga = await Vaga.create(req.body);
    res.status(201).json(vaga);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar vaga' });
  }
};

// Buscar vaga por ID
export const getVagaById = async (req, res) => {
  try {
    const vaga = await Vaga.findByPk(req.params.id);
    if (!vaga) return res.status(404).json({ erro: 'Vaga não encontrada' });
    res.json(vaga);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar vaga' });
  }
};

// Atualizar vaga
export const updateVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findByPk(req.params.id);
    if (!vaga) return res.status(404).json({ erro: 'Vaga não encontrada' });

    await vaga.update(req.body);
    res.json(vaga);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar vaga' });
  }
};

// Deletar vaga
export const deleteVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findByPk(req.params.id);
    if (!vaga) return res.status(404).json({ erro: 'Vaga não encontrada' });

    await vaga.destroy();
    res.json({ mensagem: 'Vaga deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar vaga' });
  }
};
