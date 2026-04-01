const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Tarefa = require('./models/Tarefa');

app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb+srv://GrupoDEHV:31_O3-4oi@cluster0.7xh6tie.mongodb.net/tarefas?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('MongoDB Atlas conectado'))
.catch(err => console.log(err));

// CREATE
app.post('/tarefas', async (req, res) => {
  const t = await Tarefa.create(req.body);
  res.json(t);
});

// READ
app.get('/tarefas', async (req, res) => {
  const t = await Tarefa.find();
  res.json(t);
});

// UPDATE
app.put('/tarefas/:id', async (req, res) => {
  const t = await Tarefa.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(t);
});

// DELETE
app.delete('/tarefas/:id', async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log('Servidor rodando');
});