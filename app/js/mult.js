function getPairs(n) {
    var r = [];

    for (var x = 2; x <= n; x++) {
        for (var y = 2; y <= x; y++) {
            r.push({x: x, y: y});
        }
    }

    return r;
}

function start(limit) {
    function next() {
        return ++i < pairs.length;
    }

    function x() {
        return pairs[i].x;
    }

    function y() {
        return pairs[i].y;
    }

    function isCorrect(answer) {
        return answer === '' + (x() * y());
    }

    function updateQuestion() {
        $('.factor-x').text(x());
        $('.factor-y').text(y());
        $('#answer').val('');
    }

    function showAnswer() {
        function show(row, col) {
            $('td.row' + row + '.col' + col).removeClass('remaining');
        }

        show(x(), y());
        show(y(), x());
    }

    function checkAnswer() {
        if (isCorrect($(this).val())) {
            showAnswer();
            if (next()) {
                updateQuestion();
            } else {
                alert('Klart!');
            }
        }
    }

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

    var i = 0;
    var pairs = _.shuffle(getPairs(limit));

    createTable();
    $("#answer").focus().keyup(checkAnswer);
    updateQuestion();
}

function handleSubmit() {
    $(this).hide();
    start($('input#to').val());
    return false;
}

function init() {
    var form = JST['app/templates/start.us']({
        x: 0, y: 0
    });

    $(form).submit(handleSubmit).appendTo('body')
}
