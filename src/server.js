const express = require('express');
const server = express();
const routes = require("./routes.js");
const path = require("path");

// usando template engine
server.set('view engine', 'ejs');

//mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

server.use(express.static("public"))//habilita arquivos estáticos

// habilita o uso do req.body
server.use(express.urlencoded({ extended: true}));


// aqui ele usa as rotas através do server, entretanto as rotas estão sendo executadas em outros arquivos
server.use(routes)

server.listen(3000, () => console.log("funfando"));


