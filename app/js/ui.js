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

function bindAnswer(checkAnswer) {
    $("#answer").focus().keyup(function () {
        checkAnswer($(this).val());
    });
}

function updateQuestion(pair) {
    $('.factor-x').text(pair.x);
    $('.factor-y').text(pair.y);
    $('#answer').val('');
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

function show(row, col) {
    $('td.row' + row + '.col' + col).removeClass('remaining');
}
