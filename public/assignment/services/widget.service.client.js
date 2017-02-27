(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var headerSize = [1, 2, 3, 4, 5, 6];

        var api = {
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            //for new widgets added
            // "getWidgetId": getWidgetId,
            // "getWidgetType": getWidgetType,
            "headerSize": headerSize
        };
        return api;

        // function getWidgetType(widgetId) {
        //     for (var w in widgets) {
        //         if (widgets[w].id === widgetId) {
        //             return widgets[w].widgetType;
        //         }
        //     }
        //     return null;
        // }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/' + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/' + widgetId, widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/' + pageId + '/widget');
        }


        function createWidget(pageId, widget) {
            return $http.post('/api/page/' + pageId + '/widget', widget);
        }

        // function getWidgetId() {
        //     var date = new Date();
        //
        //     var components = [
        //         date.getYear(),
        //         date.getMonth(),
        //         date.getDate(),
        //         date.getHours(),
        //         date.getMinutes(),
        //         date.getSeconds(),
        //         date.getMilliseconds()
        //     ];
        //
        //     var id = components.join("");
        //
        //     return id;
        // }


        function findWidgetById(widgetId) {
            return $http.get('/api/widget/' + widgetId);
        }

    }
})();