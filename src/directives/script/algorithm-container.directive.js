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

    function controller($log, $rootScope,$scope, types) {
        const vm = this;
        vm.searchString = '';
        vm.onTextClick = onTextClick;

        vm.showAlgorithm = showAlgorithm;


        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            let splitUrl = next.split('/');
            let lastTag = splitUrl[splitUrl.length - 1];

            for (let key in types) {
                if (types[key] === lastTag) {
                    vm.type = lastTag;
                }
            }
            $log.info(`Location changed to: /${lastTag}`);
        });

        function onTextClick($event) {
            $event.target.select();
        };

        function showAlgorithm(algorithm) {
            vm.isInAlgorithmView = true;
            vm.selectedAlgorithm = algorithm;
            $log.info('Selected algorithm: ' + vm.selectedAlgorithm.name);
            //$rootScope.$broadcast('algorithmChanged');
        }
    }
}());