/*global ui*/

var mult = {
    pairs: [],
    i: 0,
    startMillis: 0,
    limit: 9,
    name: '',
    getPair: function () {
        return this.pairs[this.i];
    },
    x: function () {
        return this.getPair().x;
    },
    y: function () {
        return this.getPair().y;
    }
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
            ui.updateQuestion(mult.getPair());
        } else {
            var endMillis = new Date().getTime();
            ui.handleScore(endMillis, endMillis - mult.startMillis, mult.limit, mult.name);
        }
    }

    function isCorrect(answer) {
        return answer === '' + (mult.x() * mult.y());
    }

    function showAnswer() {
        ui.show(mult.x(), mult.y());
        ui.show(mult.y(), mult.x());
    }

    function next() {
        return ++mult.i < mult.pairs.length;
    }
}

function start(limit, name, pairs) {
    mult.limit = limit;
    mult.name = name;
    mult.pairs = pairs || _.shuffle(getPairs(limit));
    mult.i = 0;
    mult.startMillis = new Date().getTime();

    ui.createTable(limit);
    ui.bindAnswer(checkAnswer);
    ui.updateQuestion(mult.getPair());
}
