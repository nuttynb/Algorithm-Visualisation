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
            templateUrl: 'view/main.html'
        };
    }

    function config($routeProvider) {
        $routeProvider
            .when("/sorting", {
                templateUrl: "view/sorting.html",
                controller: "sorting"
            })
            .otherwise({
                redirectTo: "/sorting"
            })
    }

    function controller($location, $log) {
        const vm = this;
        vm.nav = {};
        vm.nav.isActive = isActive;

        function init() {
            vm.appDetails = {};
            vm.appDetails.title = "Algorithm Visualization";
            vm.appDetails.tagline = "Fullos";
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