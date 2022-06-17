const express = require('express');
const readFiles = require('./readFiles');

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).json({ message: 'Olá, jovem!'});
});

router.post('/login', async (req, res) => {
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