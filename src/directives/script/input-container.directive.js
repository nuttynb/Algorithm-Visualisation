(function () {
    angular
        .module('algViz.main')
        .directive('inputContainer', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '=',
                showFunction: '=',
                timer: '='
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
        vm.slider = {
            options: {
                floor: 0,
                ceil: 1,
                step: 0.05,
                precision: 2,
                enforceStep: false,
                rightToLeft: true,
                translate: function (value, sliderId, label) {
                    switch (label) {
                        case 'model':
                            return 'Speed';
                        case 'ceil':
                            return 'Slower';
                        case 'floor':
                            return 'Faster';
                    }
                }
            }
        };

        let randomized = false;

        vm.createRandomValuesAndShow = createRandomValuesAndShow;
        vm.disableNumbersInput = disableNumbersInput;
        vm.disableRandomNumbersInput = disableRandomNumbersInput;

        function randomize(start, end) {
            return Math.floor((Math.random() * end) + start);
        }

        function parseNumbers() {
            let numbers = vm.numbers.trim().split(",");
            let result = [];
            for (let i = 0; i < numbers.length; i++) {
                if (Number.isInteger(Number(numbers[i]))) {
                    result.push(Number(numbers[i]));
                }
            }
            return result;
        }

        function createRandomValuesAndShow() {
            vm.values = [];
            if (vm.randomNumbers === null && vm.numbers === null) {
                return;
            }
            if (randomized) {
                for (let i = 0; i < vm.randomNumbers; i++) {
                    vm.values.push(randomize(vm.startRange, vm.endRange));
                }
            } else {
                vm.values = parseNumbers();
                $log.info(vm.values);
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
            randomized = true;
            angular.element(document.getElementById('numbersInput')).attr('disabled', 'true');
        }

        function disableRandomNumbersInput() {
            if ((vm.numbers === null ) || (vm.numbers === '') || (vm.numbers === '0')) {
                angular.element(document.getElementById('randNum')).removeAttr('disabled');
                angular.element(document.getElementById('randStartRange')).removeAttr('disabled');
                angular.element(document.getElementById('randEndRange')).removeAttr('disabled');
                return;
            }
            randomized = false;
            angular.element(document.getElementById('randNum')).attr('disabled', 'true');
            angular.element(document.getElementById('randStartRange')).attr('disabled', 'true');
            angular.element(document.getElementById('randEndRange')).attr('disabled', 'true');
        }
    }
}());