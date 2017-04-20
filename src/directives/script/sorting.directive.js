(function () {
    'use strict';
    angular
        .module('algViz.main')
        .directive('sorting', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
                selectedAlgorithm: '='
            },
            controller,
            controllerAs: 'sorting',
            restrict: 'E',
            template: '<input-container values="sorting.values" show-function="sorting.sort" timer="sorting.timer"></input-container><label class="tip center-block">{{sorting.values}}</label><svg id="paper"></svg>'
        };
    }

    function controller($log, $rootScope, svgTool) {
        const vm = this;
        vm.svgWidth = window.innerWidth * 0.9;
        vm.svgHeight = window.innerHeight * 0.9;
        vm.rectangles = [];
        vm.rectanglesWidth = 50;
        vm.rectanglesYPosition = -vm.svgHeight / 2;
        vm.timer = 0.5;

        vm.sort = sort;
        let svgCreator = svgTool.createSvg(vm.svgWidth, vm.svgHeight);

        let doStop = true;

        async function init() {
            vm.rectangles = [];
            svgCreator = svgTool.createSvg(vm.svgWidth, vm.svgHeight);

            vm.minValue = vm.values[1];
            vm.maxValue = vm.values[1];

            for (let i = 0; i < vm.values.length; i++) {
                if (vm.values[i] < vm.minValue) {
                    vm.minValue = vm.values[i];
                }
                if (vm.values[i] > vm.maxValue) {
                    vm.maxValue = vm.values[i];
                }
            }

            for (let i = 0; i < vm.values.length; i++) {
                vm.rectangles.push(
                    {
                        id: `rect-${i}`,
                        value: vm.values[i],
                        x: getXPosition(i),
                        height: getRectHeight(vm.values[i]),
                        init: function () {
                            this.element = svgCreator.createRectangle(this.value, this.x, vm.rectanglesYPosition, vm.rectanglesWidth, this.height);
                            return this;
                        }
                    }.init()
                );
            }
        }

        async function sort() {
            doStop = true;
            await sleep(3000);
            init();
            doStop = false;
            if (vm.selectedAlgorithm.id === 1) {
                bubbleSort();
            } else if (vm.selectedAlgorithm.id === 2) {
                selectSort();
            }
        }

        function getXPosition(index) {
            return (vm.svgWidth / (vm.values.length + 1) * (index + 1)) - vm.rectanglesWidth / 2;
        }

        function getRectHeight(value) {
            let newMin = 0;
            let newMax = vm.svgHeight / 2 - 20;

            let randomizedRange = (vm.maxValue - vm.minValue);

            let displayedRange = (newMax - newMin);
            let newValue = (((value - vm.minValue) * displayedRange) / randomizedRange) + newMin;
            if (newValue === 0) {
                newValue = 1;
            }
            return newValue;
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms * vm.timer));
        }

        async function bubbleSort() {
            let swapped;
            do {
                swapped = false;
                await sleep(2000);
                for (let i = 0; i < vm.rectangles.length - 1; i++) {
                    if (doStop) {
                        break;
                    }
                    let leftElement = vm.rectangles[i];
                    let rightElement = vm.rectangles[i + 1];
                    svgCreator.applyStyleClass('selected-rectangle', [leftElement.id, rightElement.id]);
                    await sleep(1000);
                    if (leftElement.value > rightElement.value) {
                        swap(i, i + 1);
                        swapped = true;
                    }
                    await sleep(2000);
                    svgCreator.removeStyleClass('selected-rectangle', [leftElement.id, rightElement.id]);
                }
            }
            while (swapped);
        }

        async function selectSort() {
            for (let i = 0; i < vm.rectangles.length - 1; i++) {
                if (doStop) {
                    break;
                }
                svgCreator.applyStyleClass('selected-rectangle', [vm.rectangles[i].id]);
                let min = i;
                for (let j = i + 1; j < vm.rectangles.length; j++) {
                    if (vm.rectangles[j].value < vm.rectangles[min].value) {
                        min = j;
                        svgCreator.applyStyleClass('selected-rectangle', [vm.rectangles[min].id]);
                        await sleep(2000);
                    }
                }
                if (min !== i) {
                    await sleep(1000);
                    swap(min, i);
                }
                await sleep(2000);
                svgCreator.removeStyleClass('selected-rectangle', [vm.rectangles[i].id, vm.rectangles[min].id]);
            }
        }

        function swap(leftIndex, rightIndex) {
            $log.info(`Swapping ${leftIndex} and ${rightIndex} elements.`);
            let left = vm.rectangles[leftIndex];
            let right = vm.rectangles[rightIndex];
            [left.x, right.x] = [right.x, left.x];
            vm.rectangles[leftIndex].element.rectangleElement.animate({'x': left.x}, 1000, mina.linear);
            vm.rectangles[rightIndex].element.rectangleElement.animate({'x': right.x}, 1000, mina.linear);
            let textX = (vm.rectanglesWidth / 2 - 5);
            vm.rectangles[leftIndex].element.textElement.animate({'x': left.x + textX}, 1000, mina.linear);
            vm.rectangles[rightIndex].element.textElement.animate({'x': right.x + textX}, 1000, mina.linear);
            vm.rectangles[leftIndex] = vm.rectangles.splice(rightIndex, 1, vm.rectangles[leftIndex])[0];
        }

        $rootScope.$on('algorithmStopped', function (event, args) {
            doStop = true;
            svgTool.remove();
        });

        $rootScope.$on('valuesChanged', function (event, args) {
            doStop = true;
            svgTool.remove();
        });
    }
}());
