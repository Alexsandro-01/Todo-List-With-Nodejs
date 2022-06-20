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

// DELETE
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.headers.authorization;
  
  try {
    const tasks = await readFiles('./src/data/tasks.json');
    
    const index = tasks.findIndex((value) => value.id === Number(id) && value.userId === userId);

    if (index === -1) {
      res.status(400).json({ message: "Tarefa não encontrada"});
      return;
    };
      
    tasks.splice(index, 1);

    const updatedTasksJson = JSON.stringify(tasks);
    fs.writeFile('./src/data/tasks.json', updatedTasksJson);

    res.sendStatus(202);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

});

// UPDATE
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const userId = req.headers.authorization;
  
  try {
    const tasks = await readFiles('./src/data/tasks.json');
    
    const index = tasks.findIndex((value) => value.id === Number(id) && value.userId === userId);

    if (index === -1) {
      res.status(400).json({ message: "Tarefa não encontrada"});
      return;
    }
  
    const updatedTask = { ...tasks[index], task, updatedAt: new Date() };
    
    tasks[index] = updatedTask;

    const updatedTasksJson = JSON.stringify(tasks);
    fs.writeFile('./src/data/tasks.json', updatedTasksJson);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

})

// READ
router.get('/tasks', async (req, res) => {
  const userId = req.headers.authorization;
  try {
    const tasks = await readFiles('./src/data/tasks.json');

    const userTasks = tasks.filter((value) => value.userId === userId);

    if (!userTasks) {
      res.status(404).json({ message: "Nenhuma tarefa encontrada" });
      return;
    }

    res.status(200).json(userTasks);
  } catch (error) {
    res.status(404).json({ message: "Nenhuma tarefa encontrada" });
  }
});

// CREAT
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
