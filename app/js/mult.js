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

    }

    function x() {
        return pairs[i].x;
    }

    function y() {
        return pairs[i].y;
    }
}

function updateQuestion(pair) {
    $('.factor-x').text(pair.x);
    $('.factor-y').text(pair.y);
    $('#answer').val('');
}

function show(row, col) {
    $('td.row' + row + '.col' + col).removeClass('remaining');
}

function createTable(limit) {
    $('body').append(JST['app/templates/table.us']({
        x: 0, y: 0
    }));

    for (var i = 1; i <= limit; i++) {
        var row = $('<tr></tr>').appendTo('table');

        for (var j = 1; j <= limit; j++) {
            $('<td>' + (i * j) + '</td>')
                .addClass('row' + i)
                .addClass('col' + j)
                .appendTo(row);
        }
    }

    $('td').addClass('remaining');
    $('td.row1').removeClass('remaining');
    $('td.col1').removeClass('remaining');
}
function handleScore(endMillis, elapsed, limit, name) {
    $.ajax({
        type: 'POST',
        url: '/score',
        contentType: 'application/json',
        success: getHighscoreList,
        data: JSON.stringify({
            score: elapsed,
            level: limit,
            name: name,
            timestamp: endMillis
        })
    });
    $('body').append(JST['app/templates/score.us']({
        time: elapsed * 1e-3
    }));
    $('#game').remove();
    $('form').show();
}

function bindAnswer(checkAnswer) {
    $("#answer").focus().keyup(function () {
        checkAnswer($(this).val());
    });
}

function getHighscoreList() {
    $.getJSON('/score/_all_docs', { include_docs: true }, showHighscoreList);

    function showHighscoreList(data) {
        var highscoreList = JST['app/templates/highscorelist.us']({
            items: data.rows.map(getDoc)
        });

        $(highscoreList).appendTo('body');

        function getDoc(row) {
            return row.doc;
        }
    }
}

function initUi(initGame) {
    getHighscoreList();

    var form = JST['app/templates/start.us']({
        x: 0, y: 0
    });

    $(form).submit(function handleSubmit() {
            $(this).hide();
            $('.score').remove();
            $('.highscorelist').remove();
            initGame(parseInt($('input#to').val(), 10), $('input#name').val());
            return false;
        }
    ).appendTo('body');
}
