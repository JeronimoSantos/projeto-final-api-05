import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/index.js'; // Importa o roteador principal
import corsMiddleware from './src/middleware/cors.js';

dotenv.config();

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());

// Roteador principal (agrupa todas as rotas)
app.use(router);

// Rota de saúde da API
app.get('/', (req, res) => {
  res.send('API Vagas Inclusivas - Online!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});


export default app;
