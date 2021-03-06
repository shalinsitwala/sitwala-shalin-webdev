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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;

                    if (widgets.length === 0) {
                        vm.message = "No widgets found. Try creating a new widget.";
                    }


                });

            var startIndex = -1;
            var endIndex = -1;

            $('#widget-list').sortable({
                axis: "y",
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    WidgetService
                        .sortWidgetList(vm.pageId, startIndex, endIndex)
                        .success(function (widgets) {
                            // console.log("Updated");
                            // Order updated in Page -> widgets array

                        })
                }
            });
        }

        init();


        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-' + widgetType + '.view.client.html';
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