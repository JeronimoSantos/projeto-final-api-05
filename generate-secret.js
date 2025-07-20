// Script para gerar uma chave secreta segura para JWT
import { randomBytes } from 'crypto';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Gerar uma chave secreta segura
const generateJWTSecret = () => {
  return randomBytes(64).toString('hex');
};

const envPath = join(__dirname, '.env');

// Verificar se o arquivo .env existe
if (!existsSync(envPath)) {
  console.error('Erro: Arquivo .env não encontrado.');
  console.log('Criando um novo arquivo .env...');
  
  // Criar um arquivo .env básico se não existir
  const defaultEnv = `# JWT Configuration
JWT_SECRET=${generateJWTSecret()}
JWT_EXPIRES_IN=1h

# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=your_database_password
DB_NAME=vagas_inclusivas`;

  writeFileSync(envPath, defaultEnv, 'utf-8');
  console.log('Arquivo .env criado com sucesso!');
  process.exit(0);
}

// Se o arquivo .env já existir, apenas gerar uma nova chave
console.log('Gerando uma nova chave JWT segura...');
const newSecret = generateJWTSecret();
console.log('\nSUA NOVA CHAVE JWT SECRETA:');
console.log('==========================');
console.log(newSecret);
console.log('==========================\n');

// Perguntar se deseja atualizar o .env
console.log('Deseja atualizar automaticamente o arquivo .env com esta chave? (s/n)');

// Usar readline para entrada do usuário
process.stdin.setEncoding('utf8');
process.stdin.once('data', (input) => {
  if (input.trim().toLowerCase() === 's') {
    try {
      // Ler o conteúdo atual do .env
      let envContent = readFileSync(envPath, 'utf-8');
      
      // Atualizar a chave JWT_SECRET
      if (envContent.includes('JWT_SECRET=')) {
        envContent = envContent.replace(
          /JWT_SECRET=.*/,
          `JWT_SECRET=${newSecret}`
        );
      } else {
        envContent += `\nJWT_SECRET=${newSecret}\n`;
      }
      
      // Escrever de volta no arquivo
      writeFileSync(envPath, envContent, 'utf-8');
      console.log('\n✅ Arquivo .env atualizado com sucesso!');
    } catch (error) {
      console.error('\n❌ Erro ao atualizar o arquivo .env:', error.message);
      console.log('Por favor, copie manualmente a chave para o seu arquivo .env');
    }
  } else {
    console.log('\nPor favor, copie manualmente a chave para o seu arquivo .env');
  }
  
  console.log('\nReinicie o servidor para aplicar as alterações.');
  process.exit(0);
});
