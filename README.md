# Projeto Teste

## Instruções de Configuração

1. Clone o repositório para a sua máquina local.
2. Instale as dependências do projeto utilizando o comando `npm install`.
3. Crie um arquivo `.env` na raiz do projeto.
4. Adicione as seguintes variáveis ao arquivo `.env`:  DB_HOST=(url do banco de dados), DB_USER=(nome do usuario de acesso ao banco de dados), DB_PASS=(senha do banco de dados), DB_NAME=(nome do banco de dados), DB_DIALECT=postgres .
5. Execute as migrations para criar as tabelas no banco de dados. Você pode fazer isso com o comando `npx sequelize db:migrate`.
6. Para reverter as migrations, você pode usar o comando `npx sequelize db:migrate:undo:all`.
7. Inicie o servidor com o comando `npm start`. O servidor estará rodando no endereço `http://localhost:4000`.
8. Para rodar os testes, use o comando `npm test`. Isso irá executar todos os testes definidos na pasta `tests`.
9. Para construir o projeto para produção, use o comando `npm run build`. Isso irá transpilar o código para a versão atual do Node.js e colocar o código transpilado na pasta `dist`.


