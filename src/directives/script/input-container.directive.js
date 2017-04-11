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
        vm.numbers = null;

        vm.createRandomValuesAndShow = createRandomValuesAndShow;
        vm.disableNumbersInput = disableNumbersInput;
        vm.disableRandomNumbersInput = disableRandomNumbersInput;
        $log.info(`randomNum: ${vm.randomNumbers}`);
        $log.info(`startRange: ${vm.startRange}`);
        $log.info(`endRange: ${vm.endRange}`);
        $log.info(`numbers: ${vm.numbers}`);
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

        function disableNumbersInput() {
            if ((vm.randomNumbers === null ) || (vm.randomNumbers === 0)) {
                if ((vm.startRange === null ) || (vm.startRange === 0)) {
                    if ((vm.endRange === null ) || (vm.endRange === 0)) {
                        angular.element(document.getElementById('numbersInput')).removeAttr('disabled');
                        return;
                    }
                }
            }
            angular.element(document.getElementById('numbersInput')).attr('disabled', 'true');
        }

        function disableRandomNumbersInput() {
            if ((vm.numbers === null ) || (vm.numbers === '') || (vm.numbers === '0')) {
                angular.element(document.getElementById('randNum')).removeAttr('disabled');
                angular.element(document.getElementById('randStartRange')).removeAttr('disabled');
                angular.element(document.getElementById('randEndRange')).removeAttr('disabled');
                return;
            }
            angular.element(document.getElementById('randNum')).attr('disabled', 'true');
            angular.element(document.getElementById('randStartRange')).attr('disabled', 'true');
            angular.element(document.getElementById('randEndRange')).attr('disabled', 'true');
        }
    }
}());