export const securityHeaders = (req, res, next) => {
  // Proteção contra XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Não permitir que o conteúdo seja incorporado em outros sites
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Política de Segurança de Conteúdo (CSP)
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';");
  
  // Não permitir que o navegador tipe os arquivos
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Feature Policy
  res.setHeader('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
  
  next();
};
