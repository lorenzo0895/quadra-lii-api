const express = require('express');
const router = express.Router();
const flatsService = require('../services/flatsService')

router.get('/', async (req, res) => {
  res.json(await flatsService.getFlats());
});

// router.post('/', async (req, res) => {
//   const { flat, password } = req.body;
//   res.json(await flatsService.createFlat(flat, password));
// });

router.patch('/', async (req, res) => {
  const { flat, oldPassword, password1, password2 } = req.body;
  res.json(await flatsService.changePassword(flat, oldPassword, password1, password2));
});

module.exports = router;