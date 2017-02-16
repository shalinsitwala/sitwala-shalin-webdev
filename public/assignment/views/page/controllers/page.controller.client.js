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
            pages = PageService.findPageByWebsiteId(websiteId);
            vm.pages = pages;
        }
        init();

        if(pages.length===0){
            vm.message = "No pages found. Try creating a new page.";
        }


    }
    
    
    function NewPageController($routeParams, PageService, $location) {

        var vm = this;

        // event handlers
        vm.newPage = newPage;

        //variables
        var userId =$routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        var pages;

        function init() {
            pages = PageService.findPageByWebsiteId(websiteId);
            vm.pages = pages;
        }
        init();

        function newPage(page) {
            if(angular.isUndefined(page)){
                vm.error = "Please fill the details."
            }
            else if (angular.isUndefined(page.name)){
                vm.error = "Please enter name";
            }
            else{
                // some value is filled.
                var newPage = PageService.createPage(websiteId,page);
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }
        }
    }
    
    function EditPageController($routeParams, PageService, $location) {
        var vm = this;

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        // variables
        var userId =$routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        var pages;

        function init() {
            pages = PageService.findPageByWebsiteId(websiteId);
            vm.pages = pages;
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function deletePage() {
            PageService.deletePage(pageId);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }

        function updatePage(page) {
            var updatedPage =  PageService.updatePage(pageId,page);
            if(updatedPage != null){
                vm.message = "Page updated successfully."
                $location.url('/user/'+userId+'/website/'+websiteId+'/page');
            }
            else{
                vm.error = "Page update error."
            }
        }
    }
})();