(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams, $location, PageService) {
        var vm = this;

        // event handlers

        //variables
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        var pages;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                    if (vm.pages.length == 0) {
                        vm.message = "No pages found. Try creating a new page.";
                    }
                })
                .error(function () {
                    vm.message = "Could not find page.";
                });
        }

        init();


    }


    function NewPageController($routeParams, PageService, $location) {

        var vm = this;

        // event handlers
        vm.newPage = newPage;

        //variables
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        var pages;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {
                    vm.message = "Could not find pages.";
                });

        }

        init();

        function newPage(page) {
            if (angular.isUndefined(page)) {
                vm.error = "Please fill the details."
            }
            else if (angular.isUndefined(page.name)) {
                vm.error = "Please enter name";
            }
            else {
                // some value is filled.
                PageService
                    .createPage(websiteId, page)
                    .success(function (newPage) {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    });
            }
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        // variables
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        var pages;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService
                .findPageById(pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }

        init();

        function deletePage() {
            PageService
                .deletePage(pageId)
                .success(function () {
                    $location.url('/user/' + userId + '/website/' + websiteId + '/page');
                })
                .error(function () {
                   vm.message="Could not delete the page. Please try again later.";
                });

        }

        function updatePage(page) {
            PageService
                .updatePage(pageId, page)
                .success(function (updatedPage) {
                    if (updatedPage != null) {
                        vm.message = "Page updated successfully."
                        $location.url('/user/' + userId + '/website/' + websiteId + '/page');
                    }
                    else {
                        vm.error = "Page update error."
                    }
                });

        }
    }
})();