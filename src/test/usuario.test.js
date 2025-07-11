import request from 'supertest';
import app from '../../app.js';
import { setupDatabase, closeDatabase } from '../config/database.js';

let usuarioId;

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Testes CRUD para Usuário', () => {
  test('Cria um novo usuário', async () => {
    const res = await request(app).post('/usuarios').send({
      nome: 'João PCD',
      email: 'joao@pcd.com',
      senha: '123456',
      tipo: 'PCD',
      deficiencia: 'Visual'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('João PCD');
    expect(res.body.email).toBe('joao@pcd.com');
    expect(res.body.tipo).toBe('PCD');
    expect(res.body.deficiencia).toBe('Visual');
    usuarioId = res.body.id;
  }, 20000);

  test('Lista todos os usuários', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  test('Busca um usuário por ID', async () => {
    expect(usuarioId).toBeDefined();
    const res = await request(app).get(`/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('João PCD');
  }, 20000);

  test('Atualiza um usuário', async () => {
    expect(usuarioId).toBeDefined();
    const res = await request(app).put(`/usuarios/${usuarioId}`).send({
      nome: 'João Atualizado'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('João Atualizado');
    expect(res.body.email).toBe('joao@pcd.com');
  }, 20000);

  test('Deleta um usuário', async () => {
    expect(usuarioId).toBeDefined();
    const res = await request(app).delete(`/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(204);
  }, 20000);
});
