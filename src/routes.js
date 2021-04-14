const express = require('express');//habilita o express
const routes = express.Router();//importa os routes
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboadController');


//essa rota pega todos os jobs do array e adiciona algumas informações importantes para mostrar na tela inicial
routes.get('/', DashboardController.index);

//rota que carrega a pagina de job
routes.get('/job', JobController.create);

//esse método post colocar um novo job no array citado lá em cima e atualiza com dados que faltam, o form do job.ejs está atrelado a essa rota
routes.post('/job', JobController.save);

routes.get('/job/:id', JobController.show);

routes.post('/job/:id', JobController.update);

routes.post('/job/delete/:id', JobController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);



module.exports = routes;