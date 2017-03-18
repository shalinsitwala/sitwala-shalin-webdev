module.exports = function () {

    var mongoose = require('mongoose');

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel
    };
    
    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);

    return model;
};