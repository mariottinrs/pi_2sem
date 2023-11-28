const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://femariottors:123456Fe@pi2sem.cag8fid.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));

const Resposta = mongoose.model('Resposta', {
  nome: String,
  email: String,
  telefone: String,
  mensagem: String,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/faleconosco.html');
});

app.post('/enviar-resposta', (req, res) => {
  const novaResposta = new Resposta({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    mensagem: req.body.mensagem,
  });

  novaResposta.save((err) => {
    if (err) {
      console.error(err);
      res.send('Erro ao salvar resposta.');
    } else {
      res.send('Resposta salva com sucesso!');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
