(function () {
    angular
        .module("WebAppMaker")
        .factory("WebSiteService", WebSiteService);

    function WebSiteService($http) {
        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebSiteById": findWebSiteById,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/' + websiteId);
        }


        function updateWebsite(websiteId, website) {
            return $http.put('/api/website/' + websiteId, website);
        }

        function createWebsite(userId, website) {
            return $http.post('/api/user/' + userId + '/website', website);
        }


        function findWebSiteById(webSiteId) {
            return $http.get('/api/website/' + webSiteId);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/" + userId + "/website");
        }
    }
})();