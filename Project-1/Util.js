(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.Util = factory(root);
    }
})(this, function (root) {

    'use strict';

    /**
     * @constructor
     */
    var Util = {};

    return Util;

});