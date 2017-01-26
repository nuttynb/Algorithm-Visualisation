(function () {
    angular
        .module('algViz.main')
        .factory('algorithmFactory', algorithmFactory);
    
    function algorithmFactory(types) {

        let algorithms = [
            {
                name: 'bubble',
                type: types.SORTING,
                description: 'asdasda'
            },
            {
                name: '2',
                type: types.TREE,
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