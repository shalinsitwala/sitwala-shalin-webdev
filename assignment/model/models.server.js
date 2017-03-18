module.exports = function () {

    var mongoose = require('mongoose');

    var userModel = require("./user/user.model.server.js")();


    var model = {
        userModel: userModel

    };
    userModel.setModel(model);

    return model;
};