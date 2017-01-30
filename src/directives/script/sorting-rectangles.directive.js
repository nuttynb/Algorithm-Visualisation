(function () {
    'use strict';
    angular
        .module('algViz.main')
        .directive('sortingRectangles', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '='
            },
            controller,
            controllerAs: 'sortingRectangles',
            restrict: 'E',
            templateUrl: 'src/directives/templates/sorting-rectangles.html'
        };
    }

    function controller($log) {
        const vm = this;
        vm.svgWidth = 800;
        vm.svgHeight = 800;
        vm.rectanglesWidth = 50;
        vm.numberOfRectangles = vm.values.length;
        vm.getXPosition = getXPosition;
        vm.getRectHeight = getRectHeight;

        function getXPosition(index) {
            return (vm.svgWidth/(vm.numberOfRectangles + 1) * (index + 1)) - vm.rectanglesWidth/2;
        }

        function getRectHeight(randomizedValue) {
            vm.minRandomNum = 0;
            vm.maxRandomNum = 10;

            let newMin = 0;
            let newMax = 100;

            let randomizedRange = (vm.maxRandomNum - vm.minRandomNum);

            let displayedRange = (newMax - newMin);
            let newValue = (((randomizedValue - vm.minRandomNum) * displayedRange) / randomizedRange) + newMin;
            if (newValue === 0){
                newValue = 1;
            }
            return newValue;
        }
    }
}());