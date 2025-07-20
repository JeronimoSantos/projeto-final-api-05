/**
 * Arquivo principal da aplicação
 * Responsável por configurar o servidor Express e seus middlewares
 */

// Importações principais
import express from 'express'; // Framework web para Node.js
import dotenv from 'dotenv'; // Carrega variáveis de ambiente do arquivo .env
import cookieParser from 'cookie-parser'; // Middleware para analisar cookies

// Importações de rotas e middlewares personalizados
import router from './src/routes/index.js'; // Importa todas as rotas da aplicação
import corsMiddleware from './src/middleware/cors.js'; // Configurações de CORS
import { securityHeaders } from './src/middleware/securityHeaders.js'; // Headers de segurança HTTP
import { loginLimiter, apiLimiter } from './src/middleware/rateLimiter.js'; // Limitação de taxa
import { securityLogger } from './src/middleware/securityLogger.js'; // Logger de segurança

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Verificação de Configuração Inicial
 * Garante que as variáveis de ambiente necessárias estejam definidas
 */
if (!process.env.JWT_SECRET) {
  console.error('ERRO: A variável de ambiente JWT_SECRET não está definida!');
  console.error('Por favor, crie um arquivo .env baseado no .env.example e defina uma chave secreta segura.');
  process.exit(1); // Encerra o processo se a chave JWT não estiver definida
}

// Inicializa a aplicação Express
const app = express();

/**
 * Configuração de Middlewares de Segurança
 * A ordem dos middlewares é importante!
 */
app.use(securityHeaders); // Adiciona headers de segurança HTTP (CSP, XSS Protection, etc.)
app.use(corsMiddleware); // Habilita CORS (Cross-Origin Resource Sharing)
app.use(express.json({ limit: '10kb' })); // Limita o tamanho do corpo da requisição para 10KB
app.use(cookieParser()); // Habilita o parse de cookies nas requisições
app.use(securityLogger); // Middleware para registrar eventos de segurança

/**
 * Rate Limiting
 * Limita o número de requisições para prevenir abusos e ataques de força bruta
 * O login tem um limite mais restrito definido nas rotas específicas
 */
app.use(apiLimiter); // Aplica rate limiting global para todas as rotas

/**
 * Log de Requisições (Apenas em Desenvolvimento)
 * Registra todas as requisições recebidas pelo servidor
 */
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next(); // Passa para o próximo middleware
  });
}

/**
 * Rotas da Aplicação
 * Todas as rotas são definidas no arquivo de rotas principal
 */
app.use('/', router); // Monta as rotas definidas em src/routes/index.js

/**
 * Rota Raiz - Health Check
 * Retorna o status da API e informações básicas
 * Útil para verificar se a API está online
 */
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    message: 'API Vagas Inclusivas',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  
  // Se for um erro de validação do JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      status: 'error',
      message: 'Token de autenticação inválido.'
    });
  }
  
  // Se o token tiver expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Sessão expirada. Por favor, faça login novamente.'
    });
  }

  // Outros erros
  res.status(500).json({ 
    status: 'error',
    message: 'Erro interno do servidor.',
    // Em desenvolvimento, inclui mais detalhes do erro
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
});

export default app;
