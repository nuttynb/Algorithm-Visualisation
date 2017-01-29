(function () {
    'use strict';
    angular
        .module('algViz.main')
        .directive('sortingRectangles', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '&'
            },
            controller,
            controllerAs: 'sortingRectangles',
            restrict: 'E',
            templateUrl: 'src/directives/templates/sorting-rectangles.html'
        };
    }

    function controller($log) {
        const vm = this;
        vm.svgWidth = 555;
        vm.svgHeight = 666;

    }
}());