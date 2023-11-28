const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/meu-banco-de-dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir o esquema do documento
const formularioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  mensagem: String,
});

// Criar o modelo
const Formulario = mongoose.model('Formulario', formularioSchema);

// Usar o body-parser para analisar solicitações JSON
app.use(bodyParser.json());

// Rota para receber os dados do formulário
app.post('/api/formulario', async (req, res) => {
  try {
    const { nome, email, telefone, mensagem } = req.body;

    // Criar uma instância do modelo
    const novoFormulario = new Formulario({
      nome,
      email,
      telefone,
      mensagem,
    });

    // Salvar no banco de dados
    await novoFormulario.save();

    res.status(201).json({ mensagem: 'Formulário enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao processar a solicitação.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
