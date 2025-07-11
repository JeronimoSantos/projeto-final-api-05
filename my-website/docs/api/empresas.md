
# 🏢 Empresas Inclusivas

A funcionalidade de **Empresas** na API "Mercado de Trabalho Inclusivo para PCDs" é essencial para conectar **organizações comprometidas com a inclusão** a candidatos com deficiência.

## 🎯 Objetivo

Permitir que **empresas cadastrem e gerenciem suas informações**, publiquem **vagas inclusivas** e tenham acesso a **candidaturas de PCDs** interessadas em suas oportunidades.

## 📌 O que a empresa pode fazer?

### 1. 📋 Cadastro e Gerenciamento

As empresas podem:

- Criar um perfil institucional
- Informar missão, visão e práticas de inclusão
- Cadastrar contatos e localização
- Atualizar ou remover seus dados a qualquer momento

### 2. 💼 Publicação de Vagas Inclusivas

Cada empresa pode:

- Cadastrar vagas com descrições detalhadas
- Especificar o tipo de deficiência compatível
- Informar adaptações disponíveis no ambiente de trabalho
- Definir requisitos, carga horária e benefícios

### 3. 📬 Recebimento de Candidaturas

- Visualização das candidaturas feitas por PCDs
- Acompanhamento dos perfis interessados
- Possibilidade de filtrar por tipo de deficiência, formação e localização

## 🔐 Exemplo de Estrutura de Dados

```json
{
  "id": 1,
  "nome": "Empresa Inclusiva LTDA",
  "descricao": "Comprometida com a diversidade e acessibilidade.",
  "email": "contato@inclusiva.com.br",
  "telefone": "11999999999",
  "site": "https://inclusiva.com.br",
  "endereco": "Rua da Acessibilidade, 100 - São Paulo/SP"
}
```

## 🔧 Endpoints disponíveis

| Método | Endpoint       | Descrição                     |
|--------|----------------|-------------------------------|
| GET    | `/Empresas`    | Lista todas as empresas       |
| GET    | `/Empresas/:id`| Busca empresa por ID          |
| POST   | `/Empresas`    | Cria uma nova empresa         |
| PUT    | `/Empresas/:id`| Atualiza dados da empresa     |
| DELETE | `/Empresas/:id`| Remove empresa do sistema     |

## ✅ Impacto Social

Ao participar da plataforma, a empresa:

- Demonstra **responsabilidade social** e compromisso com a inclusão
- Amplia a **diversidade de sua equipe**
- Contribui para **quebrar barreiras históricas no mercado de trabalho**
- Cumpre a **Lei de Cotas** com qualidade e propósito

> A área da empresa vai muito além do cadastro — ela é um agente ativo na **construção de um mercado de trabalho acessível, justo e inclusivo**.