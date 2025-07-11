import Empresa from '../models/empresa.model.js';

// CREATE
export const criarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.create(req.body);
    return res.status(201).json(empresa);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

// READ (All)
export const listarEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    return res.json(empresas);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

// READ (Single)
export const buscarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }
    return res.json(empresa);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

// UPDATE
export const atualizarEmpresa = async (req, res) => {
  try {
    const [updated] = await Empresa.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const empresaAtualizada = await Empresa.findByPk(req.params.id);
      return res.json(empresaAtualizada);
    }
    return res.status(404).json({ erro: 'Empresa não encontrada' });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

// DELETE
export const removerEmpresa = async (req, res) => {
  try {
    const deleted = await Empresa.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ mensagem: 'Empresa removida com sucesso' });
    }
    return res.status(404).json({ erro: 'Empresa não encontrada' });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};