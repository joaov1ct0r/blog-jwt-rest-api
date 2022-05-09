# blog-jwt-rest-api

<h1>EM DESENVOLVIMENTO</h1>

<h2>Requisitos</h2>

<ul>
<li>NodeJS</li>
  <p><code>sudo apt install nodejs</code></p>
  <br>
  <li>NPM</li>
  <p><code>sudo apt install npm</code></p>
  <br>
  <li>Express</li>
  <p><code>npm install express</code></p>
  <br>
   <li>sequelize</li>
  <p><code>npm install sequelize</code></p>
  <br>
   <li>mysql2</li>
  <p><code>npm install --save mysql2</code></p>
  <br>
  <li>bcrypt</li>
  <p><code>npm install bcryptjs</code></p>
  <br>
  <li>dotenv</li>
  <p><code>npm install dotenv</code></p>
  <br>
  <li>JWT</li>
  <p><code>npm install jsonwebtoken</code></p>
  <br>
  <li>cors</li>
  <p><code>npm install cors</code></p>
  <br>
  <li>@hapi/joi</li>
  <p><code>npm install @hapi/joi</code></p>
  <br>
</ul>

<h2>Sobre</h2>

<p>Rest API de Blog com cadastro e login do usuario e cadastro e apresentação de Posts, com rotas para admin.</p>

<h2>MODO DE USO</h2>

<h3>GIT</h3>
<hr>

<p>FAÇA O DOWNLOADS DO REPOSITORIO OU USE:<br><code>git@github.com:joaov1ct0r/blog-jwt-rest-api.git</code></p>

<h3>DEPENDENCIAS</h3>
<hr>

<p>INSTALE TODAS AS DEPENDENCIAS NECESSARIAS COM O COMANDO<code>npm install</code></p>

<h3>VARIAVEIS DE AMBIENTE</h3>
<hr>

<p>ABRA O ARQUIVO .env E ALTERE AS VARIAVEIS DE AMBIENTE COM SEUS DADOS</p>

<ul>
  <li>SERVER_PORT = PORTA QUE VOCÊ QUEIRA RODAR O SERVIDOR</li>
  <li>DB_HOST = ROTA PARA SEU BANCO DE DADOS MONGODB</li>
  <li>DB_USER = SEU USUARIO DO DB</li>
  <li>DB_PASSWORD = SENHA DA SUA DB</li>
  <li>DB_DATABASE = SUA DB</li>
  <li>DB_PORT = PORTA DA DB</li>
  <li>JWT_TOKEN_SECRET = SEU JWT TOKEN SECRET</li>
</ul>

<h3>Sequelize</h3>
<hr>

<p>FAÇA A CONEXÃO COM SEU MYSQL SERVER INSERINDO DADOS NO ARQUIVO .ENV</p>

<h3>SERVER</h3>
<hr>

<p>APOS TER OS ARQUIVOS EM SUA MAQUINA INICIE O SERVIDOR WEB NO SEU TERMINAL COM O COMANDO:<br><code>npm start</code></p>

<p>APOS ISSO AS ROTAS:<br><code>localhost:3000/api/user</code>
<br><code>localhost:3000/api/post</code><br>
<br><code>localhost:3000/api/admin</code><br>
ESTARÃO DISPONIVEIS PARA FAZER AS REQUISIÇÕES</p>
