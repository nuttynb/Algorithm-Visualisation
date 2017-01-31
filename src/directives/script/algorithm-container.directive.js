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
                isInAlgorithmView: '=algorithmView'
            },
            controller,
            controllerAs: 'algorithmContainer',
            restrict: 'E',
            templateUrl: 'src/directives/templates/algorithm-container.html'
        };

    }

    function filter() {
        return function (input, type, searchString) {
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

    function controller($log, $rootScope, types) {
        const vm = this;
        vm.searchString = '';
        vm.onTextClick = onTextClick;

        vm.selectedAlgorithm = {};
        vm.showAlgorithm = showAlgorithm;


        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            let splittedUrl = next.split('/');
            let lastTag = splittedUrl[splittedUrl.length - 1];

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
        }


    }
}());