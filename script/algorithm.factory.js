(function () {
    angular
        .module('algViz.main', [])
        .factory('algorithmFactory', algorithmFactory);
    
    function algorithmFactory() {
        return {
            getAlgorithms
        }

        let algorithms = [];

        function getAlgorithms() {
            return algorithms;
        }
    }

}());