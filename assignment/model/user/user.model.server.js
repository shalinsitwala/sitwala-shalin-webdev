module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var userModel = mongoose.model("userModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findUserById(uid) {
        return userModel.findById(uid);
    }

    function findUserByCredentials(username, password) {
        return userModel.find({username: username, password: password});
    }

    function findUserByUsername(username) {
        return userModel.find({username: username});
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function deleteUser(uid) {
        return userModel.remove({_id: uid});
    }

    function updateUser(userId, nUser) {
        return userModel
            .update({_id: userId}, {
                $set: nUser
            });
    }

};