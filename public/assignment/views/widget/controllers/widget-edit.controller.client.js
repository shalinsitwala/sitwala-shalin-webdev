(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)
    
    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;

        var userId = $routeParams.uid;
        vm.userId = userId;

        var webSiteId = $routeParams.wid;
        vm.websiteId = webSiteId;

        var pageId = $routeParams.pid;
        vm.pageId = pageId;

        var widgetId =$routeParams.wgid;
        vm.widgetId = widgetId;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;


        // for the new widget add
        var widgetType = WidgetService.getWidgetType(widgetId);


        //event handlers
        vm.updateWidget = updateWidget;
        
        function updateWidget(newWidget) {
            var updatedWidget = WidgetService.updateWidget(widgetId, newWidget);

            $location.url('/user/'+userId+'/website/'+webSiteId+'/page/'+pageId+'/widget')

        }

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

    }
})();