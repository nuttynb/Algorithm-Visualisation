(function () {
    angular
        .module('algViz.main')
        .directive('inputContainer', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
                showFunction: '='
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

        vm.createRandomValuesAndShow = createRandomValuesAndShow;
        $log.info(`randomNum: ${vm.randomNumbers}`);
        $log.info(`startRange: ${vm.startRange}`);
        $log.info(`endRange: ${vm.endRange}`);
        function randomize(start, end) {
            return Math.floor((Math.random() * end) + start);
        }

        function createRandomValuesAndShow() {
            vm.values = [];
            if (vm.randomNumbers === null) {
                return;
            }
            for (let i = 0; i < vm.randomNumbers; i++) {
                vm.values.push(randomize(vm.startRange, vm.endRange));
            }
            $rootScope.$broadcast('valuesChanged');
            vm.showFunction();
        }
    }
}());