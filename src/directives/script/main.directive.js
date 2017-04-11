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

    function controller($location, $log, algorithmFactory, svgTool, $rootScope, types) {
        const vm = this;

        vm.values = [];
        vm.nav = {};
        vm.algorithms = algorithmFactory.getAlgorithms();
        vm.selectedType = null;
        vm.isInAlgorithmView = false;
        vm.selectedAlgorithm = {};
        vm.nav.isActive = isActive;
        vm.svgTool = svgTool;
        vm.stopVisualizing = stopVisualizing;
        vm.logoClicked = logoClicked;

        function init() {
            vm.appDetails = {};
            vm.appDetails.title = 'Algorithm Visualization';
            let actualPath = $location.path().substr(1);
            for (let key in types) {
                if (types[key] === actualPath) {
                    vm.selectedType = actualPath;
                }
            }
        }

        init();

        function isActive(path) {
            if (vm.selectedType === null) {
                return false;
            }
            if (path === $location.path()) {
                return true;
            }
            return false;
        }

        function stopVisualizing() {
            $log.info("Stopping visualization.");
            vm.values = [];
            $rootScope.$broadcast('algorithmStopped');
        }

        function logoClicked() {
            vm.selectedType = null;
            vm.isInAlgorithmView = false;
            angular.element(document.getElementById('logoContainer')).removeClass('shake')
            setTimeout(function () {
                angular.element(document.getElementById('logoContainer')).addClass('shake');
            }, 10);

            stopVisualizing();
        }

        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            let splitUrl = next.split('/');
            let lastTag = splitUrl[splitUrl.length - 1];

            for (let key in types) {
                if (types[key] === lastTag) {
                    vm.selectedType = lastTag;
                }
            }
            $log.info(`Location changed to: /${lastTag}`);
        });
    }
}());