import request from 'supertest';
import app from '../../app.js';
import { setupDatabase, closeDatabase } from '../config/database.js';

let candidaturaId;
let usuarioId;
let vagaId;

beforeAll(async () => {
  await setupDatabase();

  const usuarioRes = await request(app).post('/usuarios').send({
    nome: 'Teste Usuário',
    email: 'teste@usuario.com',
    senha: '123456',
    tipo: 'PCD',
    deficiencia: 'Auditiva'
  });
  usuarioId = usuarioRes.body.id;
  expect(usuarioId).toBeDefined();

  const vagaRes = await request(app).post('/vagas').send({
    titulo: 'Vaga para Teste',
    descricao: 'Descrição teste',
    localizacao: 'Cidade Teste',
    empresa: 'Empresa Teste',
    tipo: 'Remoto'
  });
  vagaId = vagaRes.body.id;
  expect(vagaId).toBeDefined();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Testes CRUD para Candidatura', () => {
  test('Cria uma nova candidatura', async () => {
    expect(usuarioId).toBeDefined();
    expect(vagaId).toBeDefined();

    const res = await request(app).post('/candidaturas').send({
      usuarioId,
      vagaId,
      status: 'pendente'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.usuarioId).toBe(usuarioId);
    expect(res.body.vagaId).toBe(vagaId);
    expect(res.body.status).toBe('pendente');
    candidaturaId = res.body.id;
  }, 20000);

  test('Lista todas as candidaturas', async () => {
    const res = await request(app).get('/candidaturas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('usuarioId');
    expect(res.body[0]).toHaveProperty('vagaId');
    expect(res.body[0]).toHaveProperty('status');
  }, 20000);

  test('Busca candidatura por ID', async () => {
    expect(candidaturaId).toBeDefined();

    const res = await request(app).get(`/candidaturas/${candidaturaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(candidaturaId);
  }, 20000);

  test('Atualiza candidatura', async () => {
    expect(candidaturaId).toBeDefined();

    const res = await request(app).put(`/candidaturas/${candidaturaId}`).send({
      status: 'aprovado'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('aprovado');
  }, 20000);

  test('Deleta candidatura', async () => {
    expect(candidaturaId).toBeDefined();

    const res = await request(app).delete(`/candidaturas/${candidaturaId}`);
    expect(res.statusCode).toBe(204);

    // Verifica que a candidatura não existe mais
    const buscaRes = await request(app).get(`/candidaturas/${candidaturaId}`);
    expect(buscaRes.statusCode).toBe(404);
  }, 20000);
});
