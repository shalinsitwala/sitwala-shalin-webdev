(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteEditController", webSiteEditController)
        .controller("WebSiteListController", webSiteListController)
        .controller("WebSiteNewController", webSiteNewController)


    function webSiteEditController($routeParams, WebSiteService, $location) {

        var vm = this;

        // event handlers
        vm.updateSite = updateSite;
        vm.goBack = goBack;
        vm.goToProfile = goToProfile;
        vm.deleteSite = deleteSite;

        // variables
        var userId = $routeParams.uid;
        var webSiteId = $routeParams.wid;
        var websites;
        vm.userId = userId;


        function init() {
            websites = WebSiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.website = WebSiteService.findWebSiteById(webSiteId);
        }

        init();


        function deleteSite() {
            WebSiteService.deleteWebsite(webSiteId);
            $location.url('user/' + userId + '/website');

        }

        function goToProfile() {
            $location.url('user/' + userId);
        }

        function goBack() {
            $location.url('user/' + userId + '/website');
        }

        function updateSite(newSite) {
            var updatedWebSite = WebSiteService.updateWebsite(webSiteId, newSite);
            if (updatedWebSite != null) {
                vm.message = "Website updated successfully."
            }
            else {
                vm.error = "Website update error."
            }
            $location.url('user/' + userId + '/website');
        }


    }

    function webSiteListController($routeParams, WebSiteService, $location) {
        var vm = this;

        // event handlers
        vm.goBack = goBack;
        vm.goToProfile = goToProfile;

        var userId = $routeParams.uid;
        var websites;
        vm.userId = userId;

        function init() {
            WebSiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();

        // if (vm.websites.length === 0) {
        //     vm.message = "No websites found. Try creating a new website.";
        // }


        function goToProfile() {
            $location.url('user/' + userId);
        }

        function goBack() {
            $location.url('user/' + userId);
        }
    }

    function webSiteNewController(WebSiteService, $routeParams, $location) {
        var vm = this;

        // event handlers
        vm.newSite = newSite;
        vm.goBack = goBack;
        vm.goToProfile = goToProfile;


        var userId;
        userId = $routeParams.uid;
        var websites;
        vm.userId = userId;

        function init() {
            WebSiteService.findWebsitesByUser(userId);
            vm.websites = websites;
        }

        init();

        function goToProfile() {
            $location.url('user/' + userId);
        }

        function goBack() {
            $location.url('user/' + userId + '/website');
        }


        function newSite(website) {
            if (angular.isUndefined(website)) {
                vm.error = "Please fill the details."
            }
            else if (angular.isUndefined(website.name)) {
                vm.error = "Please enter name";
            }
            else {
                // some value is filled.
                var newWebSite = WebSiteService.createWebsite(userId, website);
                $location.url("user/" + userId + "/website");

            }
        }
    }

})();