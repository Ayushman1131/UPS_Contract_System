// const express = require('express');
// const router = express.Router();
// const UPS = require('../models/UPS');

// router.post('/', async (req, res) => {
//   const ups = await UPS.create(req.body);
//   res.json(ups);
// });

// router.get('/', async (req, res) => {
//   const all = await UPS.find();
//   res.json(all);
// });

// router.get('/:id', async (req, res) => {
//   const one = await UPS.findById(req.params.id);
//   res.json(one);
// });

// router.put('/:id', async (req, res) => {
//   const updated = await UPS.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// module.exports = router;
