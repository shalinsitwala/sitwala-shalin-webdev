(function () {
    angular
        .module("WebAppMaker")
        .service("WebSiteService",WebSiteService)
    
    function WebSiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        this.findAllWebSites = findAllWebSites;
        this.findWebSiteById = findWebSiteById;
        
        function findWebSiteById(webSiteId) {
            for(var w in websites){
                if(websites[w]._id == webSiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
            
        }
        
        function findAllWebSites(userId) {
            var sites = [];
            for(var w in websites){
                if(userId == websites[w].developerId){
                    sites.push(websites[w]);
                }
            }
            return sites;
        }
    }
})();