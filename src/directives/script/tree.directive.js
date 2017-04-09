(function () {
    'use strict';
    angular
        .module('algViz.main')
        .directive('tree', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
                selectedAlgorithm: '=',
            },
            controller,
            controllerAs: 'tree',
            restrict: 'E',
            template: `
<input-container values="tree.values"></input-container>
<button class="btn btn-default" ng-click="tree.sort()">Sort</button>
`,
        };
    }

    function controller($log, $rootScope, svgTool) {
        const vm = this;
        vm.svgWidth = 800;
        vm.svgHeight = 800;

        vm.sort = sort;
        let svgCreator

        let doStop = true;

        function init() {
            svgCreator = svgTool.createSvg(vm.svgWidth, vm.svgHeight);
        }

        init();

        class Node {
            constructor(x, y, value) {
                this.value = value;
                this.circleElement = svgCreator.createCircle(x, y, value);
                this.leftNode = null;
                this.leftLineElement = null;
                this.rightNode = null;
                this.rightLineElement = null;
            }
        }

        function BinarySearchTree() {
            this.root = null;
        }

        BinarySearchTree.prototype.push = function (value) {
            let root = this.root;

            if (!root) {
                this.root = new Node(vm.svgWidth / 2, 60, value, null);
                return;
            }

            let currentNode = root;

            while (currentNode) {
                if (doStop) {
                    break;
                }
                if (value < currentNode.value) {
                    if (!currentNode.leftNode) {

                        currentNode.leftNode = new Node(Number(currentNode.circleElement.attr('cx')) - 50, Number(currentNode.circleElement.attr('cy')) + 60, value);

                        setTimeout(function () {
                            currentNode.leftLineElement = svgCreator.drawLineBetweenCircles(currentNode.circleElement, currentNode.leftNode.circleElement).animate({strokeDashoffset: 0}, 10000, mina.linear);
                        }, 2000);

                        break;
                    } else {
                        currentNode = currentNode.leftNode;
                    }
                } else {
                    if (!currentNode.rightNode) {
                        setTimeout(function () {
                            currentNode.rightNode = new Node(Number(currentNode.circleElement.attr('cx')) + 50, Number(currentNode.circleElement.attr('cy')) + 60, value);
                        }, 1000);
                        setTimeout(function () {
                            currentNode.rightLineElement = svgCreator.drawLineBetweenCircles(currentNode.circleElement, currentNode.rightNode.circleElement).animate({strokeDashoffset: 0}, 10000, mina.linear);
                        }, 2000);
                        break;

                    } else {
                        currentNode = currentNode.rightNode;
                    }
                }
            }

        }

        async function sort() {
            doStop = false;
            var bst = new BinarySearchTree();
            for (let i = 0; i < vm.values.length; i++) {
                bst.push(vm.values[i]);
                await sleep(3000);
            }
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        $rootScope.$on('algorithmStopped', function (event, args) {
            doStop = true;
            svgTool.remove();
        });
    }
}());
