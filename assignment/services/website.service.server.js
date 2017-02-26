module.exports = function (app) {
    console.log("inside website service");
    app.get('/api/user/:userId/website', findWebsitesByUser);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for (var w in websites) {
            if (userId == websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        console.log(sites);
        res.json(sites);


    }
}