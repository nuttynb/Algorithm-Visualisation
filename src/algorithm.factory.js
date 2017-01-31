(function () {
    'use strict';

    angular
        .module('algViz.main')
        .factory('algorithmFactory', algorithmFactory);
    
    function algorithmFactory(types) {

        let algorithms = [
            {
                id: 1,
                name: 'Bubble sort',
                type: types.SORTING,
                description: `Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order.
                The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.`
            },
            {
                id: 2,
                name: 'Selection sort',
                type: types.SORTING,
                description: `Specifically an in-place comparison sort.
                The algorithm divides the input list into two parts: the sublist of items already sorted,
                which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list.
                Initially, the sorted sublist is empty and the unsorted sublist is the entire input list.
                The algorithm proceeds by finding the smallest (or largest, depending on sorting order)
                element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order),
                and moving the sublist boundaries one element to the right.`
            },
            {
                id: 3,
                name: 'Binary Search Tree',
                type: types.TREE,
                description: 'asdasasdada'
            },
            {
                id: 4,
                name: 'Example',
                type: types.TREE,
                description: 'ExampleDescription'
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