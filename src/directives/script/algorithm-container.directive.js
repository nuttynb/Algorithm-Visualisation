(function () {
    angular
        .module('algViz.main')
        .directive('algorithmContainer', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                algorithms: '=',
                searchString: '=',
                selectedType: '='
            },
            controller,
            controllerAs: 'container',
            restrict: 'E',
            templateUrl: 'src/directives/templates/algorithm-container.html'
        };

    }

    function controller($log) {
        const vm = this;

    }
}());