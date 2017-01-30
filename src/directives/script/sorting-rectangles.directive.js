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
        vm.rectangles = [];
        vm.rectanglesWidth = 50;
        vm.rectanglesYPosition = -vm.svgHeight / 2;
        vm.textPosition = {
            x: vm.rectanglesWidth / 2 - 5,
            y: vm.svgHeight / 2 + 20
        }
        vm.sort = sort;

        function init() {
            for (let i = 0; i < vm.values.length; i++) {
                vm.rectangles.push(
                    {
                        id: `rect-${i}`,
                        value: vm.values[i],
                        x: getXPosition(i),
                        height: getRectHeight(vm.values[i]),
                        selectedRectangle: false
                    }
                );
            }
        }

        init();

        function getXPosition(index) {
            return (vm.svgWidth / (vm.values.length + 1) * (index + 1)) - vm.rectanglesWidth / 2;
        }

        function getRectHeight(randomizedValue) {
            vm.minRandomNum = 0;
            vm.maxRandomNum = 10;

            let newMin = 0;
            let newMax = 100;

            let randomizedRange = (vm.maxRandomNum - vm.minRandomNum);

            let displayedRange = (newMax - newMin);
            let newValue = (((randomizedValue - vm.minRandomNum) * displayedRange) / randomizedRange) + newMin;
            if (newValue === 0) {
                newValue = 1;
            }
            return newValue;
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function sort() {
            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < vm.rectangles.length - 1; i++) {
                    let leftElement = vm.rectangles[i];
                    let rightElement = vm.rectangles[i + 1];
                    vm.rectangles[i].selectedRectangle = true;
                    vm.rectangles[i + 1].selectedRectangle = true;
                    await sleep(2000);
                    if (leftElement.value > rightElement.value) {
                        swap(leftElement, rightElement, i);
                        swapped = true;
                    }
                    vm.rectangles[i].selectedRectangle = false;
                    vm.rectangles[i + 1].selectedRectangle = false;
                }
            }
            while (swapped);
        }

        function swap(left, right, index) {
            [left.x, right.x] = [right.x, left.x];
            vm.rectangles[index] = vm.rectangles.splice(index+1, 1, vm.rectangles[index])[0];

            let leftSvgElement = document.getElementById(left.id);
            let rightSvgElement = document.getElementById(right.id);

            leftSvgElement.setAttribute("x", left.x);
            rightSvgElement.setAttribute("x", right.x);
        }
    }
}());