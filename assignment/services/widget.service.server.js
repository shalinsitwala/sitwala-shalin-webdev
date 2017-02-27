module.exports = function (app) {
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);



    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                if (widget.widgetType === "HEADER") {
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                }
                else if (widget.widgetType === "HTML") {
                    widgets[w].text = widget.text;
                }
                else if (widget.widgetType === "IMAGE"
                    || widget.widgetType === "YOUTUBE") {
                    widgets[w].width = widget.width;
                    widgets[w].url = widget.url;
                }
                res.json(widgets[w]);
                return;
            }
        }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id === widgetId;
        });
        res.json(widget);

    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;

        var rwidgets = [];
        for (w in widgets) {
            if (widgets[w].pageId === pageId) {
                rwidgets.push(widgets[w]);
            }
        }
        res.json(rwidgets);
    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        console.log("inside createwidget server");


        if (widget.type === "HEADER") {
            var newWidget = {
                _id: (new Date()).getTime() + "",
                widgetType: widget.type,
                pageId: pageId,
                size: widget.size,
                text: widget.text
            };
        }
        else if (widget.type === "IMAGE" || widget.type === "YOUTUBE") {
            var newWidget = {
                _id: (new Date()).getTime() + "",
                widgetType: widget.type,
                pageId: pageId,
                width: widget.width,
                url: widget.url
            };

        }
        else if (widget.type === "HTML") {
            var newWidget = {
                _id: (new Date()).getTime() + "",
                widgetType: widget.type,
                pageId: pageId,
                text: widget.text
            };

        }
        widgets.push(newWidget);
        res.json(newWidget);

    }


}