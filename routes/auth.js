const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        Message: 'Testing endpoint configuration',
        Data: null
    });
});

module.exports = router;