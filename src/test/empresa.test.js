import request from 'supertest';
import app from '../../app.js';
import { setupDatabase, closeDatabase } from '../config/database.js';

let empresaId;

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Testes CRUD para Empresa', () => {
  test('Cria uma nova empresa', async () => {
    const res = await request(app).post('/empresas').send({
      nome: 'Empresa Exemplo',
      cnpj: '12345678000199',
      email: 'empresa@exemplo.com',
      senha: '123456'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Empresa Exemplo');
    expect(res.body.cnpj).toBe('12345678000199');
    expect(res.body.email).toBe('empresa@exemplo.com');
    empresaId = res.body.id;
  }, 20000);

  test('Lista todas as empresas', async () => {
    const res = await request(app).get('/empresas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('nome');
    expect(res.body[0]).toHaveProperty('cnpj');
    expect(res.body[0]).toHaveProperty('email');
  }, 20000);

  test('Busca empresa por ID', async () => {
    expect(empresaId).toBeDefined();
    const res = await request(app).get(`/empresas/${empresaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(empresaId);
  }, 20000);

  test('Atualiza empresa', async () => {
    expect(empresaId).toBeDefined();
    const res = await request(app).put(`/empresas/${empresaId}`).send({
      nome: 'Empresa Atualizada',
      cnpj: '98765432000111',
      email: 'atualizado@empresa.com'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Empresa Atualizada');
    expect(res.body.cnpj).toBe('98765432000111');
    expect(res.body.email).toBe('atualizado@empresa.com');
  }, 20000);

  test('Deleta empresa', async () => {
    expect(empresaId).toBeDefined();
    const res = await request(app).delete(`/empresas/${empresaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensagem: 'Empresa removida com sucesso' });
  }, 20000);
});
