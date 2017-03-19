module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var websiteModel = mongoose.model("websiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findWebsitesByUser: findWebsitesByUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsite(userId, website) {
        return model.userModel
            .findUserById(userId)
            .then(function (user) {
                    website._user = user._id;
                    return websiteModel
                        .create(website)
                        .then(function (nWebsite) {
                                user.websites.push(nWebsite);
                                user.save();
                                return nWebsite;
                            },
                            function (err) {
                                console.log(error);
                            });
                },
                function (err) {
                    return null;
                });
    }

    function deleteWebsite(wid) {
        //remove from user's websites array as well.
        return websiteModel.findOne({_id: wid}).populate('_user').then(function (website) {
            website._user.websites.splice(website._user.websites.indexOf(wid), 1);
            website._user.save();
            return websiteModel.remove({_id: wid});
        }, function (err) {
            return err;
        });
        // return websiteModel.remove({_id: wid});
    }

    function updateWebsite(wId, website) {
        return websiteModel
            .update({_id: wId}, {
                $set: website
            });
    }


    function findWebsiteById(wid) {
        return websiteModel.findById(wid);
    }

    function findWebsitesByUser(uid) {
        return websiteModel.find({
            "_user": uid
        });
    }


};