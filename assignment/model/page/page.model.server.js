module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var pageModel = mongoose.model("pageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        return model.websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                    page._website = website._id;
                    return pageModel
                        .create(page)
                        .then(function (nPage) {
                                website.pages.push(nPage);
                                website.save();
                                return nPage;
                            },
                            function (err) {
                                return err;
                            });
                },
                function (err) {
                    return err;
                });
    }

    function updatePage(pId, page) {
        // delete nUser._id;

        return pageModel
            .update({_id: pId}, {
                $set: page
            });
    }

    function deletePage(pid) {
        return pageModel.findOne({_id: pid}).populate('_website').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pid), 1);
            page._website.save();
            return pageModel.remove({_id: pid});
        }, function (err) {
            return err;
        });

        // return pageModel.remove({_id: pid});
    }

    function findPageById(pid) {
        return pageModel.findById(pid);
    }

    function findAllPagesForWebsite(wid) {
        return pageModel.find({
            "_website": wid
        });
    }

};