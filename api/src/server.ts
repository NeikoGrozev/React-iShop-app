import express, { Express } from "express";

import productsController from './controllers/productsController';
import usersController from './controllers/usersController';
import checkoutController from './controllers/checkoutController';

import globalErrorHandler from "./middlewares/globalErrorHandler";
import first404Handler from "./middlewares/first404Handler";
import second404Handler from "./middlewares/second404Handler";

var cors = require('cors');

const app: Express = express();

const methodType = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
}

app.use(cors());
app.use(express.json());
app.use('/products', productsController);
app.use('/users', usersController);
app.use('/checkout', checkoutController);

// app.use(first404Handler);
// app.use(second404Handler);
app.use(globalErrorHandler);


app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get('/test', (req, res) => {
  res.json({ message: `This is ${methodType.GET} method.` })
});

app.post('/test', (req, res) => {
  res.json({ message: `This is ${methodType.POST} method.` })
});

app.delete('/test', (req, res) => {
  res.json({ message: `This is ${methodType.DELETE} method.` })
});

app.get('/throw-error', (req, res, next) => {
  throw new Error("Explicitly thrown error");
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));