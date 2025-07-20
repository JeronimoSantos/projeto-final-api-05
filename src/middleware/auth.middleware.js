/**
 * Middleware de Autenticação
 * Fornece funções para autenticação e autorização de usuários
 */

import jwt from 'jsonwebtoken'; // Para verificar e decodificar tokens JWT

/**
 * Middleware para autenticação de token JWT
 * Verifica a validade do token de acesso e, se expirado, tenta renová-lo com o refresh token
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 * @param {Function} next - Função para passar para o próximo middleware
 * @returns {void|Object} Retorna um erro se a autenticação falhar
 */
export const authenticateToken = async (req, res, next) => {
  // Get tokens from cookies
  const token = req.cookies.jwt;
  const refreshToken = req.cookies.refreshToken;

  // Se não tem token, retorna erro
  if (!token) {
    return res.status(401).json({ 
      message: 'Acesso não autorizado. Faça login para continuar.' 
    });
  }

  try {
    // Tenta verificar o token de acesso
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    // Se o token expirou, tenta renovar com o refresh token
    if (error.name === 'TokenExpiredError' && refreshToken) {
      try {
        // Verifica o refresh token
        const refreshDecoded = jwt.verify(
          refreshToken, 
          process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET + '_refresh'
        );

        // Gera um novo token de acesso
        const newToken = jwt.sign(
          { 
            id: refreshDecoded.id, 
            tipo: refreshDecoded.tipo,
            email: refreshDecoded.email 
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
        );

        // Atualiza o cookie do token de acesso
        res.cookie('jwt', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000, // 15 minutos
          path: '/',
        });

        // Adiciona o usuário ao request
        req.user = refreshDecoded;
        return next();
      } catch (refreshError) {
        console.error('Erro ao renovar token:', refreshError);
        // Se o refresh token também for inválido, limpa os cookies
        clearAuthCookies(res);
        return res.status(401).json({ 
          message: 'Sessão expirada. Por favor, faça login novamente.' 
        });
      }
    }

    // Outros erros de autenticação
    console.error('Erro de autenticação:', error);
    clearAuthCookies(res);
    return res.status(403).json({ 
      message: 'Token inválido. Faça login novamente.' 
    });
  }
};

/**
 * Função auxiliar para limpar cookies de autenticação
 * @param {Object} res - Objeto de resposta do Express
 * @returns {void}
 */
const clearAuthCookies = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.clearCookie('jwt', { ...cookieOptions, path: '/' });
  res.clearCookie('refreshToken', { ...cookieOptions, path: '/' });
};

/**
 * Middleware de autorização baseado em funções
 * Verifica se o usuário autenticado possui alguma das funções permitidas
 * @param {...string} allowedRoles - Lista de funções permitidas
 * @returns {Function} Middleware de autorização
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Usuário não autenticado.' 
      });
    }

    if (!allowedRoles.includes(req.user.tipo)) {
      return res.status(403).json({ 
        message: `Acesso negado. Apenas usuários com as seguintes permissões podem acessar: ${allowedRoles.join(', ')}` 
      });
    }
    
    next();
  };
};
