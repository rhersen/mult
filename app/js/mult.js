function getPairs(n) {
    var r = [];

    for (var x = 2; x <= n; x++) {
        for (var y = 2; y <= x; y++) {
            r.push({x: x, y: y});
        }
    }

    return r;
}

function start(pairs, limit, name) {
    var i = 0;
    var startMillis = new Date().getTime();

    createTable();
    $("#answer").focus().keyup(function () {
        checkAnswer($(this).val());
    });
    updateQuestion();

    function createTable() {
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

    function checkAnswer(answer) {
        if (isCorrect(answer)) {
            showAnswer();
            if (next()) {
                updateQuestion();
            } else {
                handleScore();
            }
        }

        function isCorrect(answer) {
            return answer === '' + (x() * y());
        }

        function showAnswer() {
            show(x(), y());
            show(y(), x());

            function show(row, col) {
                $('td.row' + row + '.col' + col).removeClass('remaining');
            }
        }

        function next() {
            return ++i < pairs.length;
        }

        function handleScore() {
            var endMillis = new Date().getTime();
            var elapsed = endMillis - startMillis;

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
    }

    function updateQuestion() {
        $('.factor-x').text(x());
        $('.factor-y').text(y());
        $('#answer').val('');
    }

    function x() {
        return pairs[i].x;
    }

    function y() {
        return pairs[i].y;
    }
}

function startRandom(limit, name) {
    start(_.shuffle(getPairs(limit)), limit, name);
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

function init() {
    getHighscoreList();

    var form = JST['app/templates/start.us']({
        x: 0, y: 0
    });

    $(form).submit(handleSubmit).appendTo('body');

    function handleSubmit() {
        $(this).hide();
        $('.score').remove();
        $('.highscorelist').remove();
        startRandom(parseInt($('input#to').val(), 10), $('input#name').val());
        return false;
    }
}
