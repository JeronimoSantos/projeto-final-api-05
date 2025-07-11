
# 💼 Vagas Inclusivas

A funcionalidade de **Vagas** na API "Mercado de Trabalho Inclusivo para PCDs" permite que empresas publiquem **oportunidades acessíveis e adaptadas** às necessidades de candidatos com deficiência.

## 🎯 Objetivo

Oferecer um canal onde as empresas possam **divulgar vagas com critérios de acessibilidade** e os usuários PCDs possam encontrar **oportunidades compatíveis com suas habilidades e limitações**.

## 📌 O que pode ser feito com as Vagas?

### 1. 📝 Cadastro de Vagas

As empresas podem:

- Informar o título da vaga
- Descrever atividades e requisitos
- Definir a compatibilidade com tipos de deficiência (visual, auditiva, motora, intelectual, etc.)
- Indicar as adaptações oferecidas (ambiente acessível, intérprete de Libras, tecnologia assistiva, etc.)
- Estabelecer local de trabalho, salário e benefícios

### 2. 🔍 Visualização de Vagas

Usuários PCDs podem:

- Navegar por todas as vagas disponíveis
- Filtrar por tipo de deficiência compatível
- Consultar detalhes sobre a empresa contratante
- Visualizar quais adaptações estão disponíveis

### 3. 📬 Candidatura

Cada vaga pode receber candidaturas diretamente pela plataforma, registrando:

- ID do usuário PCD
- ID da vaga
- Data de envio da candidatura

## 🔐 Exemplo de Estrutura de Dados

```json
{
  "id": 12,
  "titulo": "Analista de Dados Jr.",
  "descricao": "Análise de relatórios de BI e dashboards.",
  "empresaId": 3,
  "tipoDeficiencia": "auditiva",
  "adaptacoes": "Ambiente com intérprete de Libras",
  "salario": 4200,
  "local": "Remoto",
  "beneficios": "Vale Refeição, Plano de Saúde"
}
```

## 🔧 Endpoints disponíveis

| Método | Endpoint     | Descrição                       |
|--------|--------------|---------------------------------|
| GET    | `/Vagas`     | Lista todas as vagas            |
| GET    | `/Vagas/:id` | Busca vaga por ID               |
| POST   | `/Vagas`     | Cria nova vaga                  |
| PUT    | `/Vagas/:id` | Atualiza vaga existente         |
| DELETE | `/Vagas/:id` | Remove vaga do sistema          |

## ✅ Impacto Social

- Promove **transparência e acessibilidade** desde a descrição da vaga
- Garante **melhor compatibilidade entre empresa e candidato**
- Aumenta as chances de sucesso em **contratações realmente inclusivas**

> As vagas são mais do que oportunidades — são o primeiro passo para uma inclusão profissional efetiva e consciente.
