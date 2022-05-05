const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const uriDB = 'mongodb+srv://root:root@cluster0.wsldw.mongodb.net/quadralii?retryWrites=true&w=majority';
mongoose.connect(uriDB)
  .then(console.log('Exito al conectar a BD'))
  .catch('Error al conectarse a la BD');

app.use(express.json());

app.use('/books', require('./routes/booksRoute'));
app.use('/flats', require('./routes/flatsRoute'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})