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
                //templateUrl: 'view/sorting.html',
                controller: 'sorting'
            })
            .when('/tree', {
               //templateUrl: 'view/tree.html',
                controller: 'tree'
            })
            .otherwise({
                redirectTo: '/sorting'
            })
    }

    function controller(
        $location, $log, algorithmFactory
    ) {
        const vm = this;

        let path;
        $location.path()===''? path = 'sorting': path=$location.path().substr(1);

        vm.nav = {};
        vm.searchString = '';
        vm.algorithms = algorithmFactory.getAlgorithms();
        vm.selectedAlgorithms = algorithmFactory.findAlgorithmsByType(path);
        $log.debug(vm.selectedAlgorithms);
        vm.nav.isActive = isActive;
        vm.setSelectedType = setSelectedType;

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

        function setSelectedType(type) {
            vm.selectedType = type;
            vm.selectedAlgorithms = algorithmFactory.findAlgorithmsByType(type);
            $log.debug(vm.selectedAlgorithms);
        }

    }
}());