const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

router.post('/', async (req, res) => {
  const record = await Maintenance.create(req.body);
  res.json(record);
});

router.get('/:id', async (req, res) => {
  const record = await Maintenance.findById(req.params.id);
  res.json(record);
});

router.get('/', async (req, res) => {
  const logs = await Maintenance.find();
  res.json(logs);
});

router.get('/byUPS/:upsId', async (req, res) => {
  const logs = await Maintenance.find({ upsId: req.params.upsId });
  res.json(logs);
});

module.exports = router;
