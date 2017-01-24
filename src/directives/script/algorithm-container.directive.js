(function () {
    angular
        .module('algViz.main')
        .directive('algorithmContainer', Directive);

    function Directive() {
        return {
            bindToController: true,
            scope: {
                alorithms: '=',
                selectedType: '='
            },
            controller,
            controllerAs: 'container',
            restrict: 'E',
            template: template
        };
    }

    let template = `
            <div>
            </div>
            `;

    function controller($log) {
        const vm = this;

    }
}());