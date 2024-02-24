import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { 
  addToWaitlist, 
  updateStatus, 
  getWaitlist, 
  removeCustomer,
  clearWaitlist } from './service.js';
import { InputError } from './error.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status'));

app.post('/waitlist', (req, res) => {
  try {
    const customer = addToWaitlist(req.body);
    res.status(201).json(customer);
  } catch (error) {
    if (error instanceof InputError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

app.put('/waitlist/:customerId', (req, res) => {
  try {
    const { status } = req.body;
    const { customerId } = req.params;
    const updatedCustomer = updateStatus(parseInt(customerId, 10), status);
    res.json(updatedCustomer);
  } catch (error) {
    if (error instanceof InputError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

app.get('/waitlist', (req, res) => {
  res.json(getWaitlist());
});

app.delete('/waitlist/:customerId', (req, res) => {
  try {
    const { customerId } = req.params;
    const response = removeCustomer(parseInt(customerId, 10));
    res.json(response);
  } catch (error) {
    if (error instanceof InputError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

app.post('/waitlist/clear', (req, res) => {
  try {
    const response = clearWaitlist();
    res.json(response);
  } catch (error) {
    res.status(500).send({ error: 'error when clearing waitlist'});
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
