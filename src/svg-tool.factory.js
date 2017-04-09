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
        let radius = 20;

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
                applyStyleClass,
                removeStyleClass,
                createRectangle,
                createText,
                createCircle,
                createLine,
                drawLineBetweenCircles
            };
        }

        function remove() {
            $log.info("Clearing paper.");
            if (paper !== undefined) {
                paper.clear();
            }
            counter = 0;
        }

        function applyStyleClass(styleClass, elementIds) {
            for (let elementId of elementIds) {
                angular.element(document.getElementById(elementId)).addClass(styleClass);
            }
        }

        function removeStyleClass(styleClass, elementIds) {
            for (let elementId of elementIds) {
                angular.element(document.getElementById(elementId)).removeClass(styleClass);
            }
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

        function createCircle(x, y, value) {
            let circle = paper.circle(x, y, radius);
            circle.attr({
                id: `circle-${counter}`,
                fill: '#bada55',
                stroke: '#000',
                strokeWidth: 5,
            });
            let text = createText(`circle-${counter}-text`, x - 4, y + 4, value);
            counter++;
            return circle;
        }

        function createLine(id, from, to) {
            $log.info(`from x: ${from.x}, from y: ${from.y}`);
            let line = paper.path(`M${from.x},${from.y}L${to.x},${to.y}`);
            line.attr({
                id: `${id}-line`,
                stroke: '#000',
                strokeWidth: 3,
                strokeLinecap: 'round',
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
            })

            return line;
        }

        function drawLineBetweenCircles(firstCircle, secondCircle) {
            let first = {
                x: firstCircle.attr('cx'),
                y: Number(firstCircle.attr('cy')) + radius
            }
            let second = {
                x: secondCircle.attr('cx'),
                y: Number(secondCircle.attr('cy')) - radius
            }
            return createLine(firstCircle.attr('id'), first, second);
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