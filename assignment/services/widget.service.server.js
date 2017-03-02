module.exports = function (app) {
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put("/api/page/:pageId/widget?initial=initial&final=final", sortWidgets);

    var multer = require('multer'); // npm install multer --save

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

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


    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var initial = req.query.initial;
        var final = req.query.final;

        var widg = [];
        for (var w in widgets) {
            if (pageId === widgets[w].pageId) {
                widg.push(widgets[w]);
            }
        }
        widgets.splice(final, 0, widgets[initial]);
        widgets.splice(initial, 1);

        res.json(widgets);
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        // var filename      = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;


        var imageWidget = widgets.find(function (widget) {
            return widget._id == widgetId;
        })
        imageWidget.width = width;
        imageWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
        // res.sendStatus(200);
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

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