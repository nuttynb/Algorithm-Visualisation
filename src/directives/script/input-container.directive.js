(function () {
    angular
        .module('algViz.main')
        .directive('inputContainer', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
            },
            controller,
            controllerAs: 'inputs',
            restrict: 'E',
            templateUrl: 'src/directives/templates/input-container.html'
        };
    }

    function controller($log, $rootScope) {
        const vm = this;

        vm.randomNumbers = null;
        vm.startRange = null;
        vm.endRange = null;

        vm.createRandomValues = createRandomValues;
        function randomize(start, end) {
            return Math.floor((Math.random() * end) + start);
        }

        function createRandomValues() {
            vm.values = [];
            if (vm.randomNumbers === null) {
                return;
            }
            for (let i = 0; i < vm.randomNumbers; i++) {
                vm.values.push(randomize(vm.startRange, vm.endRange));
            }
            $rootScope.$broadcast('valuesChanged');
        }
    }
}());