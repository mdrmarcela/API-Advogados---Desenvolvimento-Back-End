# API de Advocacia – Desenvolvimento Back-End

API RESTful desenvolvida em **Node.js + Express** para gerenciar usuários, advogados e processos jurídicos.  
A API utiliza **JWT** para autenticação e **bcrypt** para armazenar as senhas de forma segura (hash).  
Na persistência de dados é usado o ORM **Sequelize** com banco de dados **MySQL**.

Este projeto faz parte da disciplina de **Desenvolvimento Back-End** e pode ser usado como base para estudo de:
- CRUD com Node.js + Express;
- Autenticação com JWT;
- Modelagem relacional simples (1:N).

---

## Compatibilidade

- Node.js >= 18.x  
- npm >= 9.x  
- Express 4.x  
- MySQL 8.x  
- bcrypt 6.x  
- jsonwebtoken 9.x  
- mysql2 3.x  
- Sequelize 6.x  

---

## Modelagem de Dados

O banco de dados MySQL (por exemplo `advocacia_db`) possui **3 tabelas** principais:

### 1. `usuario`
Armazena quem pode acessar o sistema.

- `id` (INT, PK, AUTO_INCREMENT)  
- `nome` (VARCHAR)  
- `email` (VARCHAR, UNIQUE)  
- `senha` (VARCHAR) – **hash da senha com bcrypt**, nunca texto plano.

### 2. `advogado`
Armazena os advogados cadastrados.

- `id` (INT, PK, AUTO_INCREMENT)  
- `nome` (VARCHAR)  
- `oab` (VARCHAR, UNIQUE) – número da OAB  
- `especialidade` (VARCHAR) – ex.: “Direito Civil”, “Direito Penal”

### 3. `processo`
Armazena os processos jurídicos.

- `id` (INT, PK, AUTO_INCREMENT)  
- `numero_processo` (VARCHAR, UNIQUE)  
- `descricao` (TEXT)  
- `status` (VARCHAR) – ex.: “em andamento”, “arquivado”, “finalizado”  
- `id_advogado` (INT, FK → `advogado.id`)  

**Relacionamento:**  
Um **advogado** pode ter **vários processos** (1:N),  
mas cada **processo** pertence a **apenas um advogado**.

---

## Organização do Projeto

Estrutura principal de pastas/arquivos:

```text
/app
  /commons        # helpers e utilitários
  /controllers    # lógica de cada recurso (Usuario, Advogado, Processo)
  /middlewares    # middlewares, ex.: validação de token JWT
  /models         # models Sequelize e conexão com o banco
  /routes         # definição das rotas da API
/modelagem        # arquivos de modelagem/diagrama do banco 
app.js            # ponto de entrada da aplicação (Express)
config.js         # configurações globais (BD e JWT)
package.json      # metadados e dependências do projeto

## Configuração do Banco de Dados

Crie um banco de dados MySQL, por exemplo: advocacia_db
(pode ser pelo phpMyAdmin ou outro cliente).

No XAMPP, inicie o MySQL e o Apache. 

## Instalação e Execução

Clonar ou baixar este repositório.

Dentro da pasta do projeto, instalar as dependências:

npm install

Certificar-se de que o MySQL está rodando e o banco advocacia_db existe.

Iniciar a aplicação em modo desenvolvimento:

npm run dev
# ou
npx nodemon

A API ficará disponível em (por padrão):
http://localhost:3000

## Autenticação e Fluxo de Uso

A API utiliza JWT (JSON Web Token) para proteger as rotas.
Fluxo básico:

Cadastro de usuário

Login para obter um token JWT

Uso das rotas protegidas enviando o token no cabeçalho Authorization.

1. Cadastro de Usuário

Endpoint: POST /usuarios
Body (JSON):

{
  "nome": "Marcela",
  "email": "marcela@teste.com",
  "senha": "123456"
}

A senha é automaticamente convertida em hash com bcrypt antes de ser salva.

O email é único.

2. Login
Endpoint: POST /usuarios/login
Body (JSON):

{
  "email": "marcela@teste.com",
  "senha": "123456"
}

3. Rotas Protegidas

Alguns exemplos de rotas protegidas por JWT:

GET /usuarios

GET /advogados

POST /advogados

GET /processos

POST /processos
(e demais rotas de CRUD conforme implementado)

Para acessar essas rotas, é obrigatório enviar o token no cabeçalho:

Authorization: Bearer SEU_TOKEN_AQUI

## Exemplo no Postman:

Aba Authorization

Type: Bearer Token

Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

O middleware em app/middlewares/tokenValido.js é responsável por:

Ler o cabeçalho Authorization;

Verificar se é um Bearer Token;

Validar o JWT usando o segredo configurado em config.js;

Bloquear a requisição caso o token seja inválido ou ausente.

Endpoints Principais (Resumo)

POST /usuarios – cadastra usuário (público)

POST /usuarios/login – login e geração de token (público)

GET /usuarios – lista usuários (protegido por JWT)

POST /advogados – cadastra advogado (protegido)

GET /advogados – lista advogados (protegido)

POST /processos – cadastra processo (protegido)

GET /processos – lista processos (protegido)

(Os detalhes exatos podem variar conforme os controllers implementados.)

Documentações Externas

Express

Sequelize ORM

JSON Web Tokens (JWT)

MySQL

Contribuindo / Estudando

Este projeto pode ser usado como base de estudo para:

Configurar uma API REST com Node.js e Express;

Usar Sequelize para mapear tabelas MySQL;

Implementar autenticação com JWT e senhas com bcrypt;

Organizar o código em camadas (models, controllers, routes, middlewares).
