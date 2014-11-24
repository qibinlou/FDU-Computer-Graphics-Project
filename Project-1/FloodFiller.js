(function (root, factory) {
    var _module = factory(root);
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return _module;
        });
    } else if (typeof exports === 'object') {
        module.exports = _module;
    }
})(this, function (root) {

    'use strict';

    var shape = require('./Shape');

    /**
     * @constructor
     */
    function FloodFiller() {
        this.init();
    };

    FloodFiller.prototype.init = function (argument) {
        // body...
        console.log('this is FloodFiller.js');
    };


    /**
     * [fill description]
     * @param graph {Array.<Array<number>>}
     * @param polygon {Polygon}
     * @param {Render | number} [render] an optional render object, e.g. fill the pixel with the same color #xxx;
     *                          or smartly fill according to the pixel's position
     */
    FloodFiller.prototype.fill = function (graph, polygon, render) {
        var box = this.getBoundingBox(polygon.vertexes);
        var edges = polygon.edges;
        var y_max = box[0].y;
        var x_max = box[0].x;
        var y_min = box[2].y;
        var x_min = box[2].x;

        for (var y = y_max; y >= y_min; --y) {
            var segment = new shape.Line(new shape.Point(x_min, y), new shape.Point(x_max, y));
            // the size of intersections.length must be even
            var intersections = this.getHorizontalInterSections(edges, segment);
            var pairs = intersections.length / 2;
            for (var i = 0; i < pairs; ++i) {
                for (var x = intersections[i].x; x < intersections[i + 1].x; ++x) {
                    // Point(x,y) is inside the polygon
                    var color = typeof render === 'number' ? render : (typeof render === 'function' ?
                        render(graph, x, y) : null);
                    graph[x][y] = color;
                }
            }
        }

    };

    /**
     *
     * @param edges
     * @param segment {Point}
     */
    FloodFiller.prototype.getHorizontalInterSections = function(edges, segment) {
        var points = [];
        var length = edges.length;
        for (var i = 0; i < length; ++i) {
            var y = segment.start.y;
            if (y < edges[i].start.y && y > edges[i].end.y) {
                var x = 0;
                points.push(new shape.Point(x, y));
            }
        }
        this.sort(points, function(a, b) {
            return a.x < b.x;
        });
    };

    /**
     *
     * @param points {Point}
     * @param cmp {function}
     */
    FloodFiller.prototype.sort = function(points, cmp) {

    };

    /**
     * get the max border box of n points
     * @param {Array.<Point>} points  an array of n points
     */
    FloodFiller.prototype.getBoundingBox = function(points) {
        var n = points.length;
        var x_min = Number.MAX_VALUE;
        var y_min = Number.MAX_VALUE;
        var x_max = Number.MIN_VALUE;
        var y_max = Number.MIN_VALUE;
        for (var i = 0; i < n; ++i) {
            var x = points[i].x;
            var y = points[i].y;
            if (x < x_min) {
                x_min = x;
            }
            else if (x > x_max) {
                x_max = x;
            }

            if (y < y_min) {
                y_min = y;
            }
            else if (y > y_max) {
                y_max = y;
            }
        }
        // the order is: left top, right top, left bottom, right bottom
        return [
            new shape.Point(x_min, y_max),
            new shape.Point(x_max, y_max),
            new shape.Point(x_min, y_min),
            new shape.Point(x_max, y_min)
        ];
    };


    return {
        'FloodFiller': FloodFiller
    };

});

