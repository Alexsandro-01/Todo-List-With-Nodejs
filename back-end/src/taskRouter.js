const express = require('express');

const readFiles = require('./readFiles');

const fs = require('fs/promises');
const { json } = require('express');

const router = express.Router();

function validTaskMiddleware(req, res, next) {
  const { task, status } = req.body;
  const userId = req.headers.authorization;

  if (!userId) {
    res.status(400).json({ message: "O Id do usuário é obrigatório"});
    return;
  }

  if (userId.length < 16) {
    res.status(400).json({ message: "O Id do usuário precisa ter 16 caracteres"});
    return;
  }

  if (!task) {
    res.status(400).json({ message: "A tarefa não pode estar vazia"});
    return;
  }

  if (!status) {
    res.status(400).json({ message: "O status não pode estar vazia"});
    return;
  }

  next();
}

async function recoverIndexMiddleware(req, res, next) {
  // se index.json já existe
  try {
    const { index } = await readFiles('./src/data/index.json');
    
    req.index = index;

    const nextIndex = index + 1;
    const newIndex = JSON.stringify({ index: nextIndex });

    fs.writeFile('./src/data/index.json', newIndex);
    
    next();
  // se index.json já existe
  } catch (error) {
    req.index = 1;
    
    const newIndex = JSON.stringify({ index: 2 });
    fs.writeFile('./src/data/index.json', newIndex);
    
    next();
  }
}

router.get('/tasks', (req, res, next) => {
  res.sendStatus(200);
});

router.post('/tasks', validTaskMiddleware, recoverIndexMiddleware, async (req, res) => {
  const data = req.body;
  const index = req.index;
  const userId = req.headers.authorization;

  const createdAt = new Date();
  const updatedAt = '';

  const newTask = { id: Number(index), userId, ...data, createdAt, updatedAt };

  // se tasks.json já existe
  try {
    const tasks = await readFiles('./src/data/tasks.json');

    tasks.push(newTask);
    const tasksJson = JSON.stringify(tasks);

    fs.writeFile('./src/data/tasks.json', tasksJson);

    res.sendStatus(201);
    return;
    // se tasks.json não existe
  } catch (error) {
    const tasksJson = JSON.stringify([newTask]);

    fs.writeFile('./src/data/tasks.json', tasksJson);

    res.sendStatus(201);
  }

});

module.exports = router;
