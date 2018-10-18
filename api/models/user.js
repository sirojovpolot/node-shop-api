const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true,  index: true,
        match: /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/ },
    password: { type: String, requiredL: true }

});

module.exports = mongoose.model('User', userScheme);