module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});

    return UserSchema;
};