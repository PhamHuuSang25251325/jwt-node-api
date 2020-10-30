
const express = require('express');
const route = express.Router();

const TaskController = require('../controllers/taskController');
const {validateRegisterUser,validate} = require('../validator');
const tokenCheckMiddleware = require('../middlewares/TokenCheckMiddleware');


route.get('/api/tasks',tokenCheckMiddleware,TaskController.getTasks);
route.post('/api/tasks',tokenCheckMiddleware,TaskController.addTaks)
route.put('/api/tasks/:id',tokenCheckMiddleware,TaskController.updateTaks)
route.delete('/api/tasks/:id',tokenCheckMiddleware,TaskController.deleteTask)

module.exports = route;