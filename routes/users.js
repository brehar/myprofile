'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.status(err ? 400 : 200).send(err || users);
    }).select('-password');
});

router.post('/', (req, res) => {
    User.register(req.body, err => {
        res.status(err ? 400 : 200).send(err);
    });
});

router.post('/login', (req, res) => {
    User.login(req.body, (err, token) => {
        if (err) return res.status(400).send(err);
        
        res.cookie('accessToken', token).send(token);
    });
});

router.delete('/logout', (req, res) => {
    res.clearCookie('accessToken').send();
});

router.get('/profile', User.isLoggedIn, (req, res) => {
    res.send(req.user);
});

router.get('/profile/:id', (req, res) => {
    User.findById(req.params.id, (err, profile) => {
        res.status(err ? 400 : 200).send(err || profile);
    }).select('-password');
});

router.put('/profile', User.isLoggedIn, (req, res) => {
    User.findByIdAndUpdate(req.user, {$set: req.body}, {new: true}, (err, profile) => {
        res.status(err ? 400 : 200).send(err || profile);
    });
});

module.exports = router;