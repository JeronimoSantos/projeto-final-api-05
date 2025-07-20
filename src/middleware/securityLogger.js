import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, '../../logs');
const securityLogFile = path.join(logDir, 'security.log');

// Cria o diretório de logs se não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Função para formatar a data
const getFormattedDate = () => {
  const now = new Date();
  return now.toISOString();
};

export const securityLogger = (req, res, next) => {
  const originalSend = res.send;
  
  // Intercepta a resposta para registrar após o envio
  res.send = function(body) {
    // Registra tentativas de login (bem-sucedidas ou não)
    if (req.path === '/auth/login' && req.method === 'POST') {
      const logEntry = {
        timestamp: getFormattedDate(),
        ip: req.ip || req.connection.remoteAddress,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        userAgent: req.get('user-agent') || 'unknown',
        email: req.body ? req.body.email : 'unknown',
        success: res.statusCode < 400
      };
      
      // Escreve no arquivo de log
      fs.appendFileSync(
        securityLogFile, 
        JSON.stringify(logEntry) + '\n',
        { flag: 'a' }
      );
    }
    
    // Chama o método original de envio
    return originalSend.call(this, body);
  };
  
  next();
};

// Função para consultar logs de segurança
export const getSecurityLogs = (limit = 100) => {
  try {
    if (!fs.existsSync(securityLogFile)) {
      return [];
    }
    
    const logData = fs.readFileSync(securityLogFile, 'utf8');
    const logs = logData
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => JSON.parse(line))
      .reverse()
      .slice(0, limit);
      
    return logs;
  } catch (error) {
    console.error('Erro ao ler logs de segurança:', error);
    return [];
  }
};
