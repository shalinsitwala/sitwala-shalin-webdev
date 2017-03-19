(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;


        //event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        var userId = $routeParams.uid;
        vm.userId = userId;
        var webSiteId = $routeParams.wid;
        vm.websiteId = webSiteId;
        var pageId = $routeParams.pid;
        vm.pageId = pageId;
        var widgetId = $routeParams.wgid;
        vm.widgetId = widgetId;
        var headerSize;


        // for the new widget add
        // var widgetType = WidgetService.getWidgetType(widgetId);


        function init() {
            vm.getEditorTemplateUrl = getEditorTemplateUrl;
            // console.log("editortemplate url in edit controller " + vm.getEditorTemplateUrl.toString());
            headerSize = WidgetService.headerSize;
            vm.headerSize = headerSize;
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (response) {
                    vm.widget = response;
                });
        }

        init();


        function deleteWidget() {
            WidgetService
                .deleteWidget(widgetId)
                .success(function () {
                    // go back to widgetlist
                    $location.url('/user/' + userId + '/website/' + webSiteId + '/page/' + pageId + '/widget');
                });
        }

        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(widgetId, newWidget)
                .success(function (updatedWidget) {
                    $location.url('/user/' + userId + '/website/' + webSiteId + '/page/' + pageId + '/widget');
                });
        }

        function getEditorTemplateUrl(type) {
            if (type === undefined) {
            }
            else {
                return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
            }
        }

    }
})();