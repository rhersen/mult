/*global ui*/

var mult = {
    pairs: [],
    i: 0,
    startMillis: 0,
    limit: 9,
    name: ''
};

function getPairs(n) {
    var r = [];

    for (var x = 2; x <= n; x++) {
        for (var y = 2; y <= x; y++) {
            r.push({x: x, y: y});
        }
    }

    return r;
}

function checkAnswer(answer) {
    if (isCorrect(answer)) {
        showAnswer();
        if (next()) {
            ui.updateQuestion(mult.pairs[mult.i]);
        } else {
            var endMillis = new Date().getTime();
            ui.handleScore(endMillis, endMillis - mult.startMillis, mult.limit, mult.name);
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
        return ++mult.i < mult.pairs.length;
    }

    function x() {
        return mult.pairs[mult.i].x;
    }

    function y() {
        return mult.pairs[mult.i].y;
    }
}

function start(limit, name) {
    mult.limit = limit;
    mult.name = name;
    mult.pairs = _.shuffle(getPairs(limit));
    mult.i = 0;
    mult.startMillis = new Date().getTime();

    ui.createTable(limit);
    ui.bindAnswer(checkAnswer);
    ui.updateQuestion(mult.pairs[mult.i]);
}
