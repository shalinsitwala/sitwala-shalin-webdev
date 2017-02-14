(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)
    
    function PageListController($routeParams, $location, PageService) {

        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.userId = userId;
        vm.websiteId = websiteId;

        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;
        if(pages.length===0){
            vm.message = "No pages found. Try creating a new page.";
        }

        // event handlers

        
    }
    
    
    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        var userId =$routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;


        // event handlers
        vm.newPage = newPage;
        
        
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
        var userId =$routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;

        vm.page = PageService.findPageById(pageId);
        
        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function deletePage() {
            PageService.deletePage(pageId);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }

        function updatePage(page) {
            var updatedPage =  PageService.updatePage(pageId,page);
            if(updatedPage != null){
                vm.message = "Page updated successfully."
            }
            else{
                vm.error = "Page update error."
            }
        }

        
    }
})();