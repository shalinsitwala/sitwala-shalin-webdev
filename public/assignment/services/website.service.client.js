(function () {
    angular
        .module("WebAppMaker")
        .factory("WebSiteService",WebSiteService);
    
    function WebSiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebSiteById": findWebSiteById,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;
        
        function deleteWebsite(websiteId) {
            for(var w in websites){
                if(websites[w]._id === websiteId){
                    websites.splice(w,1);
                    break;
                }
            }
            return websites;
            
        }


        function updateWebsite(websiteId, website) {
            for(var w in websites){
                if(websites[w]._id === websiteId){
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
            return null;
        }
        
        function createWebsite(userId, website) {
            var newSite = {
                _id: getWebSiteId(),
                name: website.name,
                developerId: userId,
                description: website.description
            };

            websites.push(newSite);
            return newSite;
            
        }

        function getWebSiteId() {
            var date = new Date();

            var components = [
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            ];

            var id = components.join("");

            return id;
        }
        
        function findWebSiteById(webSiteId) {
            for(var w in websites){
                if(websites[w]._id == webSiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
            
        }
        
        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }
    }
})();