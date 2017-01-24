(function () {
    angular
        .module('algViz.main', [])
        .directive('sortingRectangles', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                values: '&'
            },
            controller,
            controllerAs: 'sorting',
            restrict: 'E',
            templateUrl: 'view/sorting-rectangles.html'
        };
    }

    function controller($log) {
        const vm = this;

    }
}());