/**
 * Created by louqibin on 11/24/14.
 */


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

    var shape = {};

    var LineType = {
        'LINE':     0,
        'SEGMENT':  1,
        'RAY':      2
    };


    /**
     * @param x {number}
     * @param y {number}
     * @constructor
     */
    shape.Point = function(x, y) {
        if (typeof x !== 'Number' || typeof y !== 'Number') {
            throw "Not a valid point!";
        }
        this.x = x;
        this.y = y;
    };


    /**
     *
     * @param start {Point}
     * @param end {Point}
     * @param type {LineType}
     * @constructor
     */
    shape.Line = function(start, end, type) {
        this.start = start;
        this.end = end;
        this.type = type;
    };




    /**
     * create a new Polygon
     * @param vertexes {Array.<Point>}
     * @constructor
     */
    shape.Polygon = function(vertexes) {
        if (vertexes.length < 3) {
            throw "Not a valid polygon!";
        }
        this.vertexes = vertexes;
        this.edges = this.getEdgesByVertexes(vertexes);


    };

    /**
     * @param vertexes {Array.<Point>}
     * @return {Array.<Line>}
     */
    shape.Polygon.getEdgesByVertexes = function(vertexes){
        var length = vertexes.length;
        var index = 0;
        var edges = [];
        while (index < length) {
            var next = (index + 1) % length;
            edges.push(new shape.Line(vertexes[index], vertexes[next], LineType.SEGMENT));
        }
        return edges;
    };


    return shape;

});