const express = require('express');
const router =express.Router();
const {GetProfiles,AddProfile, UpdateProfile, GetProfile} = require('../controller/profilecontroller');

router.get('/profile',GetProfiles);
router.get('/profile/:email',GetProfile);
router.post('/addprofile/:email',AddProfile);
router.put('/editprofile/:email',UpdateProfile )

module.exports = router; 