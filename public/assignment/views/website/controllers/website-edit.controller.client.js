(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteEditController", webSiteEditController)
    
    function webSiteEditController($routeParams, WebSiteService) {
        var userId = $routeParams.uid;
        var webSiteId = $routeParams.wid;
        var websites = WebSiteService.findAllWebSites(userId);

        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        vm.website = WebSiteService.findWebSiteById(webSiteId);
    }

})();