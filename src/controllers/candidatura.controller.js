import { Candidatura } from '../models/index.js';

// Criar nova candidatura
export const createCandidatura = async (req, res) => {
    try {
        const novaCandidatura = await Candidatura.create(req.body);
        return res.status(201).json(novaCandidatura);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Listar todas as candidaturas
export const getCandidaturas = async (_req, res) => {
    try {
        const candidaturas = await Candidatura.findAll();
        return res.status(200).json(candidaturas);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Buscar candidatura por ID
export const getCandidaturaById = async (req, res) => {
    try {
        const candidatura = await Candidatura.findByPk(req.params.id);
        if (!candidatura) {
            return res.status(404).json({ error: 'Candidatura não encontrada' });
        }
        return res.status(200).json(candidatura);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Atualizar candidatura
export const updateCandidatura = async (req, res) => {
    try {
        const candidatura = await Candidatura.findByPk(req.params.id);
        if (!candidatura) {
            return res.status(404).json({ error: 'Candidatura não encontrada' });
        }
        await candidatura.update(req.body);
        return res.status(200).json(candidatura);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Deletar candidatura
export const deleteCandidatura = async (req, res) => {
    try {
        const candidatura = await Candidatura.findByPk(req.params.id);
        if (!candidatura) {
            return res.status(404).json({ error: 'Candidatura não encontrada' });
        }
        await candidatura.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
