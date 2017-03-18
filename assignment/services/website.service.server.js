module.exports = function (app, model) {
    var websiteModel = model.websiteModel;
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    // var websites = [
    //     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    //     {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    //     {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    //     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    //     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    // ];


    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404).send(err);
            });


        // for (w in websites) {
        //     if (websites[w]._id === websiteId) {
        //         websites.splice(w, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newSite = req.body;

        websiteModel
            .updateWebsite(websiteId, newSite)
            .then(function (newSite) {
                res.json(newSite);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // for (w in websites) {
        //     if (websites[w]._id == websiteId) {
        //         websites[w].name = newSite.name;
        //         websites[w].description = newSite.description;
        //         res.json(websites[w]);
        //         return;
        //     }
        // }
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (site) {
                res.json(site);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // var website = websites.find(function (w) {
        //     return w._id === websiteId;
        // });
        // res.json(website);
    }


    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newSite = req.body;

        websiteModel
            .createWebsite(userId, newSite)
            .then(function (newSite) {
                res.json(newSite);
            }, function (err) {
                res.statusCode(404).send(error);
            });


        // newSite._id = (new Date()).getTime() + "";
        // newSite.developerId = userId;
        // websites.push(newSite);
        // res.json(newSite);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findWebsitesByUser(userId)
            .then(function (sites) {
                res.json(sites);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // var sites = [];
        // for (var w in websites) {
        //     if (userId == websites[w].developerId) {
        //         sites.push(websites[w]);
        //     }
        // }
        // res.json(sites);
    }
};