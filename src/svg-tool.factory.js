(function () {
    'use strict';

    angular
        .module('algViz.main')
        .factory('svgTool', svgTool);

    function svgTool($log) {

        let svgWidth;
        let svgHeight;
        let paper;
        let counter = 0;

        function createSvg(width, height) {
            if (paper === undefined) {
                svgWidth = width;
                svgHeight = height;
                paper = Snap(svgWidth, svgHeight);
                paper.attr({
                    class: 'center-block',
                    viewBox: `0 0 ${width} ${height}`,
                    width: '50%',
                    height: '50%',
                });
            }
            return {
                createRectangle,
                createText,
                createCircle,
                createLine
            };
        }

        function remove() {
            $log.info("removing paper...");
            paper.clear();
            counter = 0;
        }

        function createRectangle(value, x, y, width, height) {
            let rect = paper.rect(x, y, width, height, 50, 1);
            rect.attr({
                id: `rect-${counter}`,
                fill: '#bada55',
                stroke: '#000',
                strokeWidth: 1,
                transform: 'scale(1,-1)'
            });

            let textX = x + (width / 2 - 5);
            let textY = svgHeight / 2 + 20;
            let text = createText(`rect-${counter}-text`, textX, textY, value);
            counter++;

            return {
                rectangleElement: rect,
                textElement: text
            };
        }

        function createCircle(x, y) {
            let circle = paper.circle(x, y, 50);
            circle.attr({
                id: `rect-${counter}`,
                fill: '#bada55',
                stroke: '#000',
                strokeWidth: 5,
            });
            counter++;

            return circle;
        }

        function createLine(from, to) {
            let line = paper.path(`M${from.x},${from.y}L${to.x},${to.y}`);

            return line;
        }

        function drawLineBetweenCircles(firstCircle, secondCircle) {

        }

        function createText(id, x, y, text) {
            let textElement = paper.text(x, y, text.toString())
            textElement.attr({
                id: id.toString(),
                fill: 'red',
            });
            return textElement;
        }

        return {
            createSvg,
            remove
        };
    }

}());