const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const catalog = require('./catalog.json');
const account = require('./account.json');
const fs = require('fs');
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiR2FyZGVuVXNlciIsIlN1YmplY3QiOiJnYXJkZW51c3IifQ._OsSKPlwdgV-Zxd8NTliaEgHOwN6UhJeOkwvoRzfLwQ";

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/catalog/categories', (req, res) => {
  res.send(catalog.categories);
});
server.get('/catalog/products/featured', (req, res) => {
  res.send(catalog.featured);
});
server.get('/catalog/products/search', (req, res) => {
  let search = req.query.searchString.toLowerCase();
  res.send(catalog.products.filter(p => p.name.toLowerCase().includes(search) || (p.description && p.description.toLowerCase().includes(search))));

});
server.get('/catalog/products/:categoryId',(req, res) => {
  res.send(catalog.products.filter(p => p.categoryId === +req.params.categoryId));
});

server.get('/catalog/cart', (req, res) => {
  let products = [];
  req.query.ids.forEach(id => {
    products.push(catalog.products.find(p => p.id === +id));
  });
  res.send(products);
});


server.get('/account/orders', (req, res) => {
  checkIfAuthorized(req, res)
  res.send(account.orderHeaders);
});
server.get('/account/orders/:id', (req, res) => {
  checkIfAuthorized(req, res)
  let order = account.orders.find(o => o.id === +req.params.id);
  res.send(order);
});

server.post('/auth/login', (req, res, next) => {
  if (req.body.username === 'user@gardenworld.com' && req.body.password === 'GardenUser') {
    res.send({ token: TOKEN });
  } else {
    res.status(401).send('Incorrect username or password');
  }
});


server.listen(3000, () => {
  console.log('JSON Server is running');
});


function checkIfAuthorized(req, res, next) {
  if (req.headers.authorization !== `Bearer ${TOKEN}`) {
    res.sendStatus(401).send('Unauthorized');
  }
}
