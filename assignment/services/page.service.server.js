module.exports = function (app, model) {
    var pageModel = model.pageModel;
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    // var pages = [
    //     {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    //     {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    //     {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    // ];

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.send(200);
            }, function (err) {
                res.sendStatus(400).send(err);
            });


        // for (p in pages) {
        //     if (pages[p]._id === pageId) {
        //         pages.splice(p, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }


    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(pageId, newPage)
            .then(function (nPage) {
                res.json(nPage);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // for (p in pages) {
        //     if (pages[p]._id === pageId) {
        //         pages[p].name = newPage.name;
        //         pages[p].description = newPage.description;
        //         res.json(pages[p]);
        //         return;
        //     }
        // }
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // var page = pages.find(function (p) {
        //     return p._id === pageId;
        // });
        // res.json(page);

    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
        // var rpages = [];
        // for (var p in pages) {
        //     if (pages[p].websiteId === websiteId) {
        //         rpages.push(pages[p]);
        //     }
        // }
        // res.json(rpages);

    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;

        pageModel
            .createPage(websiteId, newPage)
            .then(function (newPage) {
                res.json(newPage);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // newPage._id = (new Date()).getTime() + "";
        // newPage.websiteId = websiteId;
        // pages.push(newPage);
        // res.json(newPage);
    }

}