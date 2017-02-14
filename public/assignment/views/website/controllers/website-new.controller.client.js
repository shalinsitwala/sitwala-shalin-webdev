(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteNewController", webSiteNewController)
    
    function webSiteNewController(WebSiteService, $routeParams, $location) {
        var vm = this;
        var userId;

        function init() {
            userId = $routeParams.uid;
        }
        init();
        
        // event handler
        vm.newSite = newSite;


        function newSite(website) {
            var newWebSite = WebSiteService.createWebsite(userId, website);
            $location.url("user/"+userId+"/website");
            
        }
        
    }
})();