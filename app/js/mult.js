function getPairs(n) {
    var r = [];

    for (var x = 2; x <= n; x++) {
        for (var y = 2; y <= x; y++) {
            r.push({x: x, y: y});
        }
    }

    return r;
}

function start(pairs, limit) {
    var i = 0;
    var millis = new Date().getTime();

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
                var score = new Date().getTime() - millis;
                $.ajax({
                    type: 'POST',
                    url: 'http://mult.hersen.name/score',
                    data: JSON.stringify({score: score}),
                    contentType: 'application/json'
                });
                $('body').append(JST['app/templates/score.us']({
                    time: score * 1e-3
                }));

                $('#game').remove();
                $('form').show();
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

function startRandom(limit) {
    start(_.shuffle(getPairs(limit)), limit);
}

function init() {
    var form = JST['app/templates/start.us']({
        x: 0, y: 0
    });

    $(form).submit(handleSubmit).appendTo('body');

    function handleSubmit() {
        $(this).hide();
        $('.score').remove();
        startRandom($('input#to').val());
        return false;
    }
}
