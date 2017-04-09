(function () {
    'use strict';
    angular
        .module('algViz.main')
        .directive('algorithmContainer', Directive)
        .filter('algorithmFilterByType', filter);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
                algorithms: '=',
                type: '=',
                isInAlgorithmView: '=algorithmView',
                selectedAlgorithm: '='
            },
            controller,
            controllerAs: 'algorithmContainer',
            restrict: 'E',
            templateUrl: 'src/directives/templates/algorithm-container.html'
        };

    }

    function filter() {
        return function (input, type, searchString) {
            if (type === null) {
                return input;
            }
            if (searchString) {
                return input;
            }
            let result = [];
            angular.forEach(input, algorithm => {
                if (algorithm.type === type) {
                    result.push(algorithm);
                }
            });
            return result;
        }

    }

    function controller($log) {
        const vm = this;
        vm.searchString = '';
        vm.onTextClick = onTextClick;
        vm.isRendered = isRendered;
        vm.showAlgorithm = showAlgorithm;

        function onTextClick($event) {
            $event.target.select();
        }

        function showAlgorithm(algorithm) {
            vm.isInAlgorithmView = true;
            vm.selectedAlgorithm = algorithm;
            $log.info('Selected algorithm: ' + vm.selectedAlgorithm.name);
        }

        function isRendered(type) {
            if (vm.isInAlgorithmView === true) {
                if (type === vm.selectedAlgorithm.type) {
                    return true;
                } else {
                    return false;
                }
            }
            if (type === undefined) {
                return true;
            }
            return false;
        }
    }
}());