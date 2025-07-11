# 👤 Usuários PCDs

A funcionalidade de **Usuários** na API "Mercado de Trabalho Inclusivo para PCDs" representa os **candidatos com deficiência** que buscam oportunidades no mercado de trabalho inclusivo.

## 🎯 Objetivo

Oferecer uma plataforma onde pessoas com deficiência possam **criar perfis completos**, **buscar vagas compatíveis com suas necessidades** e **participar ativamente de processos seletivos acessíveis**.

## 📌 O que o usuário pode fazer?

### 1. 📝 Cadastro e Gerenciamento de Perfil

Os candidatos podem:

- Criar e editar seu perfil pessoal
- Informar o tipo de deficiência (motora, visual, auditiva, intelectual, múltipla)
- Adicionar qualificações, experiências e preferências de trabalho
- Listar necessidades específicas de acessibilidade
- Excluir seu perfil se desejarem

### 2. 🔍 Busca por Vagas Inclusivas

- Visualização de vagas compatíveis com seu perfil
- Filtro por localização, tipo de vaga e acessibilidade
- Detalhamento das adaptações oferecidas por cada empresa

### 3. 📬 Candidatura a Vagas

- Enviar candidaturas diretamente do sistema
- Acompanhar o status de suas candidaturas
- Receber notificações sobre oportunidades

## 🔐 Exemplo de Estrutura de Dados

```json
{
  "id": 7,
  "nome": "João da Silva",
  "email": "joao.silva@email.com",
  "telefone": "11988887777",
  "deficiencia": "visual",
  "formacao": "Tecnólogo em Sistemas para Internet",
  "experiencia": "2 anos como assistente de TI",
  "preferencias": "Vagas remotas, horário flexível",
  "acessibilidade": "Leitor de tela, material digital acessível"
}