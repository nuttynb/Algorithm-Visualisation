(function () {
    'use strict';
    angular
        .module('algViz.main')
        .directive('sortingRectangles', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
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
                await sleep(2000);
                for (let i = 0; i < vm.rectangles.length - 1; i++) {
                    let leftElement = vm.rectangles[i];
                    let rightElement = vm.rectangles[i + 1];
                    applyStyleClass('selected-rectangle', [leftElement.id, rightElement.id]);
                    await sleep(2000);
                    if (leftElement.value > rightElement.value) {
                        swap(leftElement, rightElement, i);
                        swapped = true;
                    }
                    removeStyleClass('selected-rectangle', [leftElement.id, rightElement.id]);
                }
            }
            while (swapped);
        }
        function applyStyleClass(styleClass, elementIds){
            for (let elementId of elementIds){
                angular.element(document.getElementById(elementId)).addClass(styleClass);
            }
        }
        function removeStyleClass(styleClass, elementIds){
            for (let elementId of elementIds){
                angular.element(document.getElementById(elementId)).removeClass(styleClass);
            }
        }

        function swap(left, right, index) {
            [left.x, right.x] = [right.x, left.x];
            vm.rectangles[index] = vm.rectangles.splice(index+1, 1, vm.rectangles[index])[0];

            let leftRectElement = document.getElementById(left.id);
            let rightRectElement = document.getElementById(right.id);
            let leftTextElement = document.getElementById(`${left.id}-text`);
            let rightTextElement = document.getElementById(`${right.id}-text`);

            leftRectElement.setAttribute("x", left.x);
            rightRectElement.setAttribute("x", right.x);
            leftTextElement.setAttribute("x", left.x + vm.textPosition.x);
            rightTextElement.setAttribute("x", right.x + vm.textPosition.x);
        }
    }
}());