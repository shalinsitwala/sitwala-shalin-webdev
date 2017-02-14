(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteEditController", webSiteEditController)
    
    function webSiteEditController($routeParams, WebSiteService, $location) {
        var userId = $routeParams.uid;
        var webSiteId = $routeParams.wid;
        var websites = WebSiteService.findWebsitesByUser(userId);

        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        vm.website = WebSiteService.findWebSiteById(webSiteId);
        
        
        // event handlers
        vm.updateSite = updateSite;
        vm.goBack = goBack;
        
        function goBack() {
            $location.url('user/'+ userId+ '/website');
        }
        
        function updateSite(newSite) {
            var updatedWebSite =  WebSiteService.updateWebsite(webSiteId,newSite);
            if(updatedWebSite != null){
                vm.message = "Website updated successfully."
            }
            else{
                vm.error = "Website update error."
            }
        }
        
        
    }

})();