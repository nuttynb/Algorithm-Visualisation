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
                    selectedAlgorithm: '=',
                },
                controller,
                controllerAs: 'sortingRectangles',
                restrict: 'E',
                template: `<button class="btn btn-default" ng-click="sortingRectangles.sort()">Sort</button>`,
            };
        }

        function controller($log, $rootScope, svgTool) {
            const vm = this;
            vm.svgWidth = 800;
            vm.svgHeight = 800;
            vm.rectangles = [];
            vm.rectanglesWidth = 50;
            vm.rectanglesYPosition = -vm.svgHeight / 2;

            vm.sort = sort;

            function init() {
                let svgCreator = svgTool.createSvg(vm.svgWidth, vm.svgHeight);

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

            init();

            function sort() {
                if (vm.selectedAlgorithm.id === 1) {
                    bubbleSort();
                } else if (vm.selectedAlgorithm.id === 2) {
                    selectSort();
                }
            }

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

            async function bubbleSort() {
                let swapped;
                do {
                    swapped = false;
                    await sleep(2000);
                    for (let i = 0; i < vm.rectangles.length - 1; i++) {
                        let leftElement = vm.rectangles[i];
                        let rightElement = vm.rectangles[i + 1];
                        applyStyleClass('selected-rectangle', [leftElement.id, rightElement.id]);
                        await sleep(1000);
                        if (leftElement.value > rightElement.value) {
                            swap(i, i + 1);
                            swapped = true;
                        }
                        await sleep(2000);
                        removeStyleClass('selected-rectangle', [leftElement.id, rightElement.id]);
                    }
                }
                while (swapped);
            }

            async function selectSort() {
                for (let i = 0; i < vm.rectangles.length; i++) {
                    applyStyleClass('selected-rectangle', [vm.rectangles[i].id]);
                    let min = i;
                    for (let j = vm.rectangles.length - 1; j > i; j--) {
                        if (vm.rectangles[j].value < vm.rectangles[min].value) {
                            min = j;
                            applyStyleClass('selected-rectangle', [vm.rectangles[min].id]);
                            await sleep(2000);
                        }
                    }
                    if (min != i) {
                        await sleep(1000);
                        swap(min, i);
                    }
                    await sleep(2000);
                    removeStyleClass('selected-rectangle', [vm.rectangles[i].id, vm.rectangles[min].id]);
                }
            }

            function applyStyleClass(styleClass, elementIds) {
                for (let elementId of elementIds) {
                    angular.element(document.getElementById(elementId)).addClass(styleClass);
                }
            }

            function removeStyleClass(styleClass, elementIds) {
                for (let elementId of elementIds) {
                    angular.element(document.getElementById(elementId)).removeClass(styleClass);
                }
            }

            function swap(leftIndex, rightIndex) {
                $log.info(`Swapping ${leftIndex} and ${rightIndex} elements.`);
                let left = vm.rectangles[leftIndex];
                let right = vm.rectangles[rightIndex];
                [left.x, right.x] = [right.x, left.x];
                vm.rectangles[leftIndex].element.rectangleElement.animate({"x": left.x}, 1000, mina.linear);
                vm.rectangles[rightIndex].element.rectangleElement.animate({"x": right.x}, 1000, mina.linear);
                let textX = (vm.rectanglesWidth / 2 - 5);
                vm.rectangles[leftIndex].element.textElement.animate({"x": left.x + textX}, 1000, mina.linear);
                vm.rectangles[rightIndex].element.textElement.animate({"x": right.x + textX}, 1000, mina.linear);
                vm.rectangles[leftIndex] = vm.rectangles.splice(rightIndex, 1, vm.rectangles[leftIndex])[0];
            }

            /*$rootScope.$on('algorithmChanged', function(event, args) {
             $log.info("fos");
             svgTool.remove();
             //init();
             });*/
        }
    }

    ()
);