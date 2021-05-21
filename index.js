const express = require('express'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  config = require('./config/config'),
  app = express(),
  middlewareTokenCheckRouter = express.Router();

app.set('privatekey', config.key);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

middlewareTokenCheckRouter.use((req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, app.get('privatekey'), (err, decoded) => {
      if (err) {
        return res.json({ err: 'Token inválida' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      err: 'Token no proveída.',
    });
  }
});

app.get('/', function (req, res) {
  res.send('Lo que hay en /');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.user === 'admin' && req.body.pass === '1234') {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get('privatekey'), {
      expiresIn: 10000,
    });
    res.json({ token });
  } else {
    res.json({ err: 'Incorrect user or paswword' });
  }
});

app.get('/data', middlewareTokenCheckRouter, (req, res) => {
  const datos = [
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
    { id: 1, name: 'Cálculo', nota: 10 },
    { id: 2, name: 'Física', nota: 6 },
    { id: 3, name: 'Biología', nota: 80 },
  ];

  res.json(datos);
});

app.listen(3000, () => {
  console.log('Fluzeando en el puerto 3000');
});

// https://asfo.medium.com/autenticando-un-api-rest-con-nodejs-y-jwt-json-web-tokens-5f3674aba50e
