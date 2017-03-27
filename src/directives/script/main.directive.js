(function () {

    angular
        .module('algViz.main', [])
        .directive('pageBody', Directive)
        .config(config);

    function Directive() {
        return {
            bindToController: true,
            controller,
            controllerAs: 'main',
            restrict: 'E',
            templateUrl: 'src/directives/templates/main.html'
        };
    }

    function config($routeProvider) {
        $routeProvider
            .when('/sorting', {
                templateUrl: 'src/directives/templates/main.html'
            })
            .when('/tree', {
                templateUrl: 'src/directives/templates/main.html'
            })
            .otherwise({
                redirectTo: '/sorting'
            })
    }

    function controller(
        $location, $log, algorithmFactory, svgTool
    ) {
        const vm = this;

        vm.nav = {};
        vm.algorithms = algorithmFactory.getAlgorithms();
        vm.selectedType = 'sorting';
        vm.isInAlgorithmView = false;
        vm.selectedAlgorithm = {};
        vm.nav.isActive = isActive;
        vm.svgTool = svgTool;


        function init() {
            vm.appDetails = {};
            vm.appDetails.title = 'Algorithm Visualization';
            vm.appDetails.tagline = 'Fullos';
        }

        init();

        function isActive(path) {
            if (path === $location.path()) {
                return true;
            }
            return false;
        }


    }
}());