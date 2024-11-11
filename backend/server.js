const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id !== parseInt(id));
  res.status(204).send();
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
