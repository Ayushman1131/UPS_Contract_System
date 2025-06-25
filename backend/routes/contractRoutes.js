const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

router.post('/', async (req, res) => {
  const contract = await Contract.create(req.body);
  res.json(contract);
});

router.get('/:id', async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  res.json(contract);
});

router.get('/', async (req, res) => {
  const contracts = await Contract.find();
  res.json(contracts);
});

router.put('/:id', async (req, res) => {
  const updated = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;
