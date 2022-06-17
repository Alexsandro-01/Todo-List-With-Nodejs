const express = require('express');
const crypto = require('crypto');
const readFiles = require('./readFiles');

const fs = require('fs/promises');

const router = express.Router();

function validBodyMiddleware(req, res, next) {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400).json({ message: "O campo Name é obrigatório"});
    return;
  }

  const regex = /\S+@\S+\.\S+/;
  if(!regex.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }

  if(password.length < 6) {
    res.status(400).json({ message: "O campo password deve ter pelo menos 6 caracteres"});
    return;
  }

  next();
}

router.post('/sign-up', validBodyMiddleware, async (req, res) => {
  const data = req.body;
  const createdAt = new Date();
  const id = crypto.randomBytes(8).toString('hex');

  const user = { id, ...data, createdAt };
  
  try {
    const users = await readFiles('./src/data/users.json');
    
    users.push(user);
    const usersJson = JSON.stringify(users);
    
    fs.writeFile('./src/data/users.json', usersJson);
    res.status(201).json(user);
    return;
  }
  catch (err) {
    const userJson = JSON.stringify([user]);
  
    fs.writeFile('./src/data/users.json', userJson);
    res.status(201).json(user);
  }

})

module.exports = router;