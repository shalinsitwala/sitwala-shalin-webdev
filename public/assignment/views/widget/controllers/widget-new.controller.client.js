(function () {

    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);


    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        // event handlers
        vm.newWidget = newWidget;

        function newWidget(newWidgetType) {

            var newWidget = {
                type: newWidgetType
            };

            WidgetService
                .createWidget(pageId, newWidget)
                .success(function (addedWidget) {
                    $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + addedWidget._id);
                });
        }
    }
})();