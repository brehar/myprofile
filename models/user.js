'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'This is my secret. It is long and unguessable. It can be as long as you want.';

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    biography: {
        type: String
    },
    links: [
        {
            type: String
        }
    ]
});

userSchema.statics.register = function(userObj, cb) {
    this.create(userObj, cb);
};

userSchema.statics.login = function(userObj, cb) {
    this.findOne({username: userObj.username}, (err, dbUser) => {
        if (err || !dbUser) return cb(err || {error: 'Login failed. Username or password incorrect.'});

        if (dbUser.password !== userObj.password) {
            return cb({error: 'Login failed. Username or password incorrect.'});
        }

        var token = dbUser.makeToken();

        cb(null, token);
    });
};

userSchema.statics.isLoggedIn = function(req, res, next) {
    var token = req.cookies.accessToken;

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).send({error: 'Must be authenticated.'});

        User.findById(payload._id, (err, user) => {
            if (err || !user) return res.clearCookie('accessToken').status(400).send({error: 'User not found.'});

            req.user = user;

            next();
        }).select('-password');
    });
};

userSchema.methods.makeToken = function() {
    var token = jwt.sign({
        _id: this._id
    }, JWT_SECRET);

    return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;