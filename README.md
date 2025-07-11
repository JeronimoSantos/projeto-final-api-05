
# 🌐 API - Mercado de Trabalho Inclusivo para PCDs

## 🚨 Problema

Pessoas com Deficiência (PCDs) enfrentam dificuldades para acessar oportunidades no mercado de trabalho devido à falta de vagas inclusivas e processos seletivos inadequados. 💼❌

## 💡 Solução

A API **"Mercado de Trabalho Inclusivo para PCDs"** conecta empresas que oferecem vagas inclusivas a candidatos com deficiência. Ela facilita o processo de recrutamento e inclusão, garantindo oportunidades adequadas às necessidades de cada candidato. 🤝💪

---

## 📚 Funcionalidades

Esta API implementa **CRUD completo** para os seguintes recursos:

1. **Usuário (PCD)**  
   - Criar, ler, atualizar e deletar perfis dos candidatos com deficiência.

2. **Empresa**  
   - Gerenciar empresas que oferecem vagas inclusivas.

3. **Vaga**  
   - Gerenciar vagas inclusivas disponíveis nas empresas.

4. **Candidatura**  
   - Gerenciar candidaturas dos usuários às vagas disponíveis.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — runtime JavaScript para backend.
- **Express** — framework web para criação da API.
- **Sequelize** — ORM para manipulação do banco de dados.
- **SQLite** — banco de dados leve para desenvolvimento.
- **Jest** — framework para testes automatizados.
- **CORS** — middleware para habilitar requisições cross-origin.
- **Swagger** — documentação da API.
- **MkDocs** — documentação do projeto.

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/API-Mercado-Inclusivo.git
cd API-Mercado-Inclusivo
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados SQLite (arquivo `database.sqlite` ou outro caminho configurado).

4. Rode as migrações (se aplicável) e inicialize o servidor:

```bash
npm run migrate
npm start
```

5. Para rodar os testes automatizados:

```bash
npm test
```

---

## 📋 Endpoints Principais

- **Usuários (PCDs):** `/Usuarios`
- **Empresas:** `/Empresas`
- **Vagas:** `/Vagas`
- **Candidaturas:** `/Candidaturas`

Cada recurso suporta os métodos:  
- `GET /` — lista todos  
- `GET /:id` — busca por id  
- `POST /` — cria novo  
- `PUT /:id` — atualiza por id  
- `DELETE /:id` — remove por id

---

## 👥 Squad de Desenvolvimento

Equipe Squad 5, comprometida com impacto social, acessibilidade e inclusão digital.

| Nome             | Função              |
|------------------|---------------------|
| Fábio Kawan Freitas Júnior      | Líder | 
| Deivid Jose Leal Caldas   | Colaborador/a | 
|  Luiz Vinicius Ferreira dos santos      | Colaborador/a         | 
| Matheus Henrique Silva Nascimento    | Colaborador/a       |
| Julia Tito Assunção  | Colaborador/a   | 

---

## 📄 Documentação da API

Para mais detalhes sobre os endpoints, consulte a documentação Swagger disponível em `/docs` (se implementada).

---

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## ⚖️ Licença

Este projeto está sob a licença MIT.
