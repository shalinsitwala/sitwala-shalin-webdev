(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteListController", webSiteListController)
    
    function webSiteListController($routeParams, WebSiteService) {
        var userId = $routeParams.uid;
        var websites = WebSiteService.findAllWebSites(userId);

        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
    }


})();