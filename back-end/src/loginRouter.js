const express = require('express');
const readFiles = require('./readFiles');

const router = express.Router();

function validLoginMiddleware(req, res, next) {
  const { email, password } = req.body;

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

router.get('/login', (req, res) => {
  res.status(200).json({ message: 'Olá, jovem!'});
});

router.post('/login', validLoginMiddleware, async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await readFiles('./src/data/users.json');

    const user = users.find((value) => value.email === email && value.password === password);

    if (user) {
      res.status(200).json(user);
      return;
    }
    
    res.status(400).json({ message: "Usuário não encontrado"});
  }
  catch (error) {
    res.status(400).json({ message: "Usuário não encontrado"});
  }

})

module.exports = router;