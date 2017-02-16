(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
    
    function widgetListController($sce, $routeParams, WidgetService) {
        var vm = this;

        // Event Handlers
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        vm.userId = $routeParams.uid;


        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        vm.pageId = $routeParams.pid;
        var widgets;

        function init() {
            widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            vm.widgets = widgets;
        }
        init();

        if(widgets.length===0){
            vm.message = "No widgets found. Try creating a new widget.";
        }
        
        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
        
        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
        
        
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;

            return $sce.trustAsResourceUrl(baseUrl);
        }
    }
})();