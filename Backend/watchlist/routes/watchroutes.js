const express = require('express');
const router =express.Router();
const { GetWatchs, AddWatch, GetWatch, DeleteWatch} = require('../controller/watchcontroller');

router.get('/watchs',GetWatchs);
router.get('/watch/:id',GetWatch);
router.post('/addwatch/:email',AddWatch);
router.delete("/deletewatch/:id",DeleteWatch);


module.exports = router;