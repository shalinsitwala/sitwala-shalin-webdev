(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
    
    function widgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.widgets = WidgetService.findAllWidgets(vm.pageId);
        
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