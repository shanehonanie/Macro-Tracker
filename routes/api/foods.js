const express = require('express');
const router = express.Router();

// @route GET api/foods/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Foods Works' }));

module.exports = router;
