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


        var headerSize = WidgetService.headerSize;
        vm.headerSize = headerSize;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;


        // for the new widget add
        var widgetType = WidgetService.getWidgetType(widgetId);


        //event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        
        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
            // go back to widgetlist
            $location.url('/user/'+userId+'/website/'+webSiteId+'/page/'+pageId+'/widget');
            
        }
        
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