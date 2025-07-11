import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './src/config/database.js';
import app from './app.js';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho ajustado para src/docs/swagger.json
const swaggerFilePath = path.join(__dirname, 'src', 'docs', 'swagger.json');

let swaggerDocument = {};
try {
  if (fs.existsSync(swaggerFilePath)) {
    swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));
  } else {
    console.warn('Arquivo Swagger não encontrado. Documentação não será carregada.');
  }
} catch (err) {
  console.error('Erro ao carregar o arquivo Swagger:', err.message);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
    process.exit(1);
  }
})();
