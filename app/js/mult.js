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

    createTable(limit);
    bindAnswer(checkAnswer);
    updateQuestion(pairs[i]);

    function checkAnswer(answer) {
        if (isCorrect(answer)) {
            showAnswer();
            if (next()) {
                updateQuestion(pairs[i]);
            } else {
                var endMillis = new Date().getTime();
                handleScore(endMillis, endMillis - startMillis, limit, name);
            }
        }

        function isCorrect(answer) {
            return answer === '' + (x() * y());
        }

        function showAnswer() {
            show(x(), y());
            show(y(), x());
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
