(function () {
    angular
        .module('algViz.main')
        .factory('algorithmFactory', algorithmFactory);
    
    function algorithmFactory() {

        let algorithms = [
            {
                name: 'bubble',
                type: 'sorting',
                description: 'asdasda'
            },
            {
                name: '2',
                type: 'tree',
                description: 'asdasasdada'
            }
        ];

        function getAlgorithms() {
            return algorithms;
        }

        function findAlgorithmsByType(type) {
            return algorithms.filter(
                algorithm => algorithm.type === type
            );
        }

        return {
            getAlgorithms,
            findAlgorithmsByType
        }
    }

}());