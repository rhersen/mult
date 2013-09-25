/*global ui*/

function getPairs(n) {
    var r = [];

    for (var x = 2; x <= n; x++) {
        for (var y = 2; y <= x; y++) {
            r.push({x: x, y: y});
        }
    }

    return r;
}

function start(limit, name) {
    var pairs = _.shuffle(getPairs(limit));
    var i = 0;
    var startMillis = new Date().getTime();

    ui.createTable(limit);
    ui.bindAnswer(checkAnswer);
    ui.updateQuestion(pairs[i]);

    function checkAnswer(answer) {
        if (isCorrect(answer)) {
            showAnswer();
            if (next()) {
                ui.updateQuestion(pairs[i]);
            } else {
                var endMillis = new Date().getTime();
                ui.handleScore(endMillis, endMillis - startMillis, limit, name);
            }
        }

        function isCorrect(answer) {
            return answer === '' + (x() * y());
        }

        function showAnswer() {
            ui.show(x(), y());
            ui.show(y(), x());
        }

        function next() {
            return ++i < pairs.length;
        }

        function x() {
            return pairs[i].x;
        }

        function y() {
            return pairs[i].y;
        }
    }
}
