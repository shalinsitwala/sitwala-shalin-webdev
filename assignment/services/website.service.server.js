module.exports = function (app) {
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];


    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newSite = req.body;
        for (w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].name = newSite.name;
                websites[w].description = newSite.description;
                res.json(websites[w]);
                return;
            }
        }
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id === websiteId;
        });
        res.json(website);
    }


    function createWebsite(req, res) {

        var userId = req.params.userId;
        var newSite = req.body;
        newSite._id = (new Date()).getTime() + "";
        newSite.developerId = userId;
        websites.push(newSite);
        res.json(newSite);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for (var w in websites) {
            if (userId == websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }
}