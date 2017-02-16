(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var headerSize = [1,2,3,4,5,6];
        var api = {
            "findAllWidgets": findAllWidgets,
            "findWidgetById": findWidgetById,
            "createWidget" : createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            //for new widgets added
            "getWidgetId": getWidgetId,
            "getWidgetType": getWidgetType,
            "headerSize": headerSize
        };
        return api;
        
        function getWidgetType(widgetId) {
            for(var w in widgets){
                if(widgets[w].id === widgetId){
                    return widgets[w].widgetType;
                }
            }
            return null;
            
        }

        function deleteWidget(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets.splice(w,1);
                    break;
                }
            }
            return widgets;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    if(widget.widgetType === "HEADER"){
                        widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                    }
                    else if(widget.widgetType === "HTML"){
                        widgets[w].text = widget.text;
                    }
                    else if(widget.widgetType === "IMAGE"
                                || widget.widgetType === "YOUTUBE"){
                        widgets[w].width = widget.width;
                        widgets[w].url = widget.url;
                    }
                    return widgets[w];
                }
            }
            return null;
            
        }

        function findWidgetsByPageId(pageId) {
            var rwidgets = [];
            for(w in widgets){
                if(widgets[w].pageId === pageId){
                    rwidgets.push(widgets[w]);
                }
            }
            return rwidgets;
        }
        
        
        function createWidget(pageId, widget) {
            if(widget.type === "HEADER"){
                var newWidget = {
                    _id: getWidgetId(),
                    widgetType: widget.type,
                    pageId: pageId,
                    size: widget.size,
                    text: widget.text
                };
            }
            else if (widget.type === "IMAGE" || widget.type === "YOUTUBE"){
                var newWidget = {
                    _id: getWidgetId(),
                    widgetType: widget.type,
                    pageId: pageId,
                    width: widget.width,
                    url: widget.url
                };

            }
            else if (widget.type === "HTML"){
                var newWidget = {
                    _id: getWidgetId(),
                    widgetType: widget.type,
                    pageId: pageId,
                    text: widget.text
                };

            }
            widgets.push(newWidget);
            return newWidget;
        }

        function getWidgetId() {
            var date = new Date();

            var components = [
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            ];

            var id = components.join("");

            return id;
        }
        
        
        function findWidgetById(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }


        function findAllWidgets() {
            return widgets;
        }
    }
})();