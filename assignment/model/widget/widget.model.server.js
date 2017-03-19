module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("widgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pId, widget) {

        return model.pageModel
            .findPageById(pId)
            .then(function (page) {
                widget._page = pId;
                return widgetModel
                    .create(widget)
                    .then(function (nWidget) {
                        page.widgets.push(nWidget);
                        page.save();
                        return nWidget;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }


    function updateWidget(wId, widget) {
        return widgetModel
            .update({_id: wId}, {
                $set: widget
            });
    }

    function deleteWidget(wid) {
        return widgetModel.remove({_id: wid})
    }

    function findWidgetById(wid) {
        return widgetModel.findById(wid);
    }

    function findAllWidgetsForPage(pid) {
        return widgetModel.find({
            "_page": pid
        });
    }

    function reorderWidget(pageId, start, end) {

        return widgetModel
            .find({_page: pageId}, function (error, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                        else if (widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }

                        else if (widget.order < start && widget.order >= end) {
                            widget.order = widget.order + 1;
                            widget.save();
                        }
                    }
                });
            });
    }
};