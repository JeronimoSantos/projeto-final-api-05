# 📬 Candidaturas

A funcionalidade de **Candidaturas** na API "Mercado de Trabalho Inclusivo para PCDs" é o elo entre o candidato PCD e a vaga inclusiva oferecida por uma empresa.

## 🎯 Objetivo

Permitir que usuários com deficiência possam **se candidatar de forma simples, acessível e segura** às vagas disponíveis, e que as empresas consigam **gerenciar os interessados com clareza**.

## 📌 O que pode ser feito com as Candidaturas?

### 1. ✍️ Enviar Candidatura

Usuários PCDs podem:

- Escolher uma vaga inclusiva
- Candidatar-se com um clique (associando seu perfil à vaga)
- Visualizar status da candidatura e possíveis atualizações

### 2. 🔎 Acompanhamento pela Empresa

Empresas conseguem:

- Ver a lista de candidatos por vaga
- Acessar detalhes do perfil do candidato PCD
- Avaliar compatibilidade com a vaga e adaptações disponíveis

### 3. 🔄 Atualização e Cancelamento

- Candidatos podem **cancelar candidaturas**
- Sistema pode registrar **data e status** (ex: “pendente”, “em avaliação”, “entrevistado”, “finalizado”)

## 🔐 Exemplo de Estrutura de Dados

```json
{
  "id": 45,
  "usuarioId": 7,
  "vagaId": 12,
  "dataCandidatura": "2025-05-18",
  "status": "em avaliação"
}
```

## 🔧 Endpoints disponíveis

| Método | Endpoint             | Descrição                               |
|--------|----------------------|-----------------------------------------|
| GET    | `/Candidaturas`      | Lista todas as candidaturas             |
| GET    | `/Candidaturas/:id`  | Busca candidatura por ID                |
| POST   | `/Candidaturas`      | Cria nova candidatura                   |
| PUT    | `/Candidaturas/:id`  | Atualiza status ou dados da candidatura |
| DELETE | `/Candidaturas/:id`  | Remove candidatura                      |

## ✅ Impacto Social

- Estimula a **participação ativa do PCD no mercado de trabalho**
- Facilita o **diálogo entre empresa e candidato**
- Melhora a **experiência e acessibilidade no processo seletivo**
- Gera **dados valiosos para inclusão e diversidade**

> A candidatura é o momento em que o talento encontra a oportunidade — com acessibilidade, dignidade e protagonismo.
