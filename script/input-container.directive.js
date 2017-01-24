(function () {
    angular
        .module('algViz.main', [])
        .directive('inputContainer', Directive);

    function Directive() {
        return {
            bindToController: true,
            controller,
            controllerAs: 'basicInputs',
            restrict: 'E',
            templateUrl: 'view/input-container.html'
        };
    }

    function controller($log) {
        const vm = this;

    }
}());