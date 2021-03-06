module.exports = function (app, model) {

    var widgetModel = model.widgetModel;
    var pageModel = model.pageModel;

    // app.put("/api/page/:pageId/widget", sortWidgets);
    app.post('/api/order/:pageId/widget', sortWidgets);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);


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

    // var widgets = [
    //     {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"
    //     },
    //     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"
    //     },
    //     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    // function sortWidgets(req, res) {
    //     var pageId = req.params.pageId;
    //     console.log("pageid is: " + pageId);
    //
    //     var initial = req.query.initial;
    //     var final = req.query.final;
    //
    //     console.log("intiial is " + initial);
    //     console.log('final is : ' + final);
    // }

    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var initial = req.query.initial;
        var final = req.query.final;

        pageModel
            .reorderWidgets(pageId, initial, final)
            .then(function (stats) {
                res.send(200);
            }, function (err) {
                res.send(400);
            });


        res.send(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         widgets.splice(w, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var imageWidget = {
            width: width,
            _id: widgetId
        };

        if (req.file) {
            var myFile = req.file;
            var originalname = myFile.originalname; // File name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            imageWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;


            widgetModel
                .updateWidget(widgetId, imageWidget)
                .then(function (response) {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                }, function (err) {
                    res.sendStatus(400).send(err);
                });

        }

    }


    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         if (widget.type === "HEADER") {
        //             widgets[w].size = widget.size;
        //             widgets[w].text = widget.text;
        //         }
        //         else if (widget.type === "HTML") {
        //             widgets[w].text = widget.text;
        //         }
        //         else if (widget.type === "IMAGE"
        //             || widget.type === "YOUTUBE") {
        //             widgets[w].width = widget.width;
        //             widgets[w].url = widget.url;
        //         }
        //         res.json(widgets[w]);
        //         return;
        //     }
        // }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // var widget = widgets.find(function (w) {
        //     return w._id === widgetId;
        // });
        // res.json(widget);

    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        var orderedWidgets = [];


        // pageModel
        //     .findPageById(pageId)
        //     .then(function (page) {
        //
        //         for (i = 0; i < page.widgets.length; i++) {
        //             console.log("outside model i is" + i );
        //             widgetModel
        //                 .findWidgetById(page.widgets[i])
        //                 .then(function (widget) {
        //                     console.log("i is " + i);
        //                     console.log("page.widgets.length"  + page.widgets.length);
        //                     console.log("widget is " + widget);
        //                     // orderedWidgets.push(widget);
        //
        //
        //                 }, function (err) {
        //                     console.log(err);
        //                 });
        //
        //
        //         }

                // page.widgets.forEach(function (item, index) {
                //
                //     widgetModel
                //         .findWidgetById(item)
                //         .then(function (widget) {
                //
                //             orderedWidgets.push(widget);
                //             console.log("index is " + index);
                //             console.log("len is " + page.widgets.length);
                //             if (orderedWidgets.length == page.widgets.length) {
                //                 //all items traversed then return
                //                 res.send(orderedWidgets);
                //             }
                //
                //         }, function (err) {
                //             console.log(error);
                //         })
                //
                // });


                // res.json(widgets);
            // }, function (err) {
            //     res.sendStatus(400).send(err);
            // });


        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        if (widget.type === "HEADER") {
            var newWidget = {
                // _id: (new Date()).getTime() + "",
                type: widget.type,
                pageId: pageId,
                size: widget.size,
                text: widget.text
            };
        }
        else if (widget.type === "IMAGE" || widget.type === "YOUTUBE") {
            var newWidget = {
                // _id: (new Date()).getTime() + "",
                type: widget.type,
                pageId: pageId,
                width: widget.width,
                url: widget.url
            };

        }
        else if (widget.type === "HTML") {
            var newWidget = {
                // _id: (new Date()).getTime() + "",
                type: widget.type,
                pageId: pageId,
                text: widget.text
            };
        }
        else if (widget.type === "TEXT") {
            var newWidget = {
                type: widget.type,
                pageId: pageId,
                text: widget.text,
                rows: widget.rows,
                placeholder: widget.placeholder,
                formatted: widget.formatted
            };
        }

        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // widgets.push(newWidget);
        // res.json(newWidget);

    }


};