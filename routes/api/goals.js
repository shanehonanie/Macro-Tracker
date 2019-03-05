const express = require('express');
const router = express.Router();

// @route GET api/goals/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Goals Works' }));

module.exports = router;
