/**
 * Controlador de Autenticação
 * Gerencia as operações de autenticação: login, logout, renovação de token e obtenção do usuário atual
 */

// Importações de bibliotecas externas
import bcrypt from 'bcrypt'; // Para hash e verificação de senhas
import jwt from 'jsonwebtoken'; // Para geração e verificação de tokens JWT
import dotenv from 'dotenv'; // Para carregar variáveis de ambiente

// Importação do modelo de Usuário
import { Usuario } from '../models/index.js';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Log de Depuração - Variáveis de Ambiente
 * Exibe o status das variáveis de ambiente necessárias
 * Apenas para fins de depuração em desenvolvimento
 */
if (process.env.NODE_ENV === 'development') {
  console.log('=== Variáveis de Ambiente no auth.controller.js ===');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '*** (definido)' : 'NÃO DEFINIDO');
  console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN || 'não definido');
  console.log('REFRESH_TOKEN_SECRET:', process.env.REFRESH_TOKEN_SECRET ? '*** (definido)' : 'NÃO DEFINIDO');
  console.log('REFRESH_TOKEN_EXPIRES_IN:', process.env.REFRESH_TOKEN_EXPIRES_IN || 'não definido');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'não definido');
  console.log('==============================================');
}

/**
 * Realiza o login do usuário
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 * @returns {Object} Dados do usuário e tokens de autenticação
 */
export const login = async (req, res) => {
  const { email, senha } = req.body;
  
  console.log('Tentativa de login para:', email);
  console.log('Corpo da requisição:', JSON.stringify(req.body, null, 2));

  try {
    console.log('Buscando usuário no banco de dados...');
    const usuario = await Usuario.findOne({ where: { email } });
    console.log('Usuário encontrado:', usuario ? 'Sim' : 'Não');

    if (!usuario) {
      console.log('Usuário não encontrado para o email:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    console.log('Comparando senhas...');
    console.log('Senha fornecida:', senha);
    console.log('Hash da senha no banco:', usuario.senha);
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log('Senha válida?', senhaValida);
    
    if (!senhaValida) {
      console.log('Senha inválida para o usuário:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Create token with user data
    const token = jwt.sign(
      { 
        id: usuario.id, 
        tipo: usuario.tipo,
        email: usuario.email
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { 
        id: usuario.id, 
        tipo: usuario.tipo,
        email: usuario.email
      }, 
      process.env.REFRESH_TOKEN_SECRET, 
      { 
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
      }
    );

    // Set cookie with token
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Proteção contra CSRF
      maxAge: 60 * 60 * 1000, // 1 hora
      path: '/',
    });

    // Set cookie with refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Proteção contra CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      path: '/',
    });

    // Return user data (without sensitive information)
    const { senha: _, ...userData } = usuario.get({ plain: true });
    return res.status(200).json({ 
      user: userData,
      message: 'Login realizado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Realiza o logout do usuário
 * Remove os cookies de autenticação
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 * @returns {Object} Mensagem de sucesso
 */
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    
    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro no logout:', error);
    return res.status(500).json({ error: 'Erro ao realizar logout' });
  }
};

/**
 * Obtém os dados do usuário atualmente autenticado
 * @param {Object} req - Objeto de requisição do Express (deve conter o usuário autenticado)
 * @param {Object} res - Objeto de resposta do Express
 * @returns {Object} Dados do usuário (sem a senha)
 */
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const user = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['senha'] } // Exclui a senha dos dados retornados
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return res.status(500).json({ error: 'Erro ao buscar informações do usuário' });
  }
};

/**
 * Renova o token de acesso usando o refresh token
 * @param {Object} req - Objeto de requisição do Express (deve conter o cookie refreshToken)
 * @param {Object} res - Objeto de resposta do Express
 * @returns {Object} Novo token de acesso
 */
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não encontrado' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Refresh token inválido' });
      }

      const token = jwt.sign(
        { 
          id: decoded.id, 
          tipo: decoded.tipo,
          email: decoded.email
        }, 
        process.env.JWT_SECRET, 
        { 
          expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // Proteção contra CSRF
        maxAge: 60 * 60 * 1000, // 1 hora
        path: '/',
      });

      return res.status(200).json({ message: 'Token atualizado com sucesso' });
    });
  } catch (error) {
    console.error('Erro ao atualizar token:', error);
    return res.status(500).json({ error: 'Erro ao atualizar token' });
  }
};
