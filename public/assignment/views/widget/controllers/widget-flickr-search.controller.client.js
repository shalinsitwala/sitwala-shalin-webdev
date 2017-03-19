(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, WidgetService, $location, FlickrService) {
        var vm = this;

        var userId = $routeParams.uid;
        vm.userId = userId;
        var webSiteId = $routeParams.wid;
        vm.websiteId = webSiteId;
        var pageId = $routeParams.pid;
        vm.pageId = pageId;
        var widgetId = $routeParams.wgid;
        vm.widgetId = widgetId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;


        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(widgetId)
                .then(function (response) {
                    var updatedWidget = response.data;
                    updatedWidget.url = url;
                    WidgetService
                        .updateWidget(widgetId, updatedWidget)
                        .then(function (response) {
                            var updatedWidgetObject = response;
                            if (updatedWidgetObject) {
                                $location.url("/user/" + userId + "/website/" + webSiteId + "/page/" + pageId + "/widget");
                            }
                        }, function (err) {
                            vm.error = "Could not update";
                        });
                }, function (err) {
                    vm.error = "Could not find the widget";
                });
        }

    }
})();