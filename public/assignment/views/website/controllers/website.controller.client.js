(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteEditController", webSiteEditController)
        .controller("WebSiteListController", webSiteListController)
        .controller("WebSiteNewController", webSiteNewController);


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
            WebSiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });

            WebSiteService
                .findWebSiteById(webSiteId)
                .success(function (website) {
                    vm.website = website;
                })
        }

        init();


        function deleteSite() {
            WebSiteService
                .deleteWebsite(webSiteId)
                .success(function () {
                    $location.url('user/' + userId + '/website');
                })
                .error(function () {
                    vm.error = "Could not delete. Please try again.";
                });
        }

        function goToProfile() {
            $location.url('user/' + userId);
        }

        function goBack() {
            $location.url('user/' + userId + '/website');
        }

        function updateSite(newSite) {
            WebSiteService
                .updateWebsite(webSiteId, newSite)
                .success(function (updatedWebSite) {
                    if (updatedWebSite != null) {
                        vm.message = "Website updated successfully."
                    }
                    else {
                        vm.error = "Website update error."
                    }
                    $location.url('user/' + userId + '/website');
                });

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
                    if (vm.websites.length == 0) {
                        vm.message = "No websites found. Try creating a new website.";
                    }
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
            WebSiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });

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

                WebSiteService
                    .createWebsite(userId, website)
                    .success(function (website) {
                        $location.url("user/" + userId + "/website");
                    })


            }
        }
    }

})();