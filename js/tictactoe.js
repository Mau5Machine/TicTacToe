$(document).ready(function () {
    // Submit player name button
    const submitName = $('.submit');

    // Select all squares
    const squares = $('tr > td');

    // Create players as objects
    const player = [{
            marker: 'x',
            squares: [],
            name: '1',
            score: 0
        },
        {
            marker: 'o',
            squares: [],
            name: '2',
            score: 0
        }
    ]
    // game over variable
    var gameOver = false;

    // ties variable
    var ties = 0;

    // variable for turn
    var playerTurn = 0;

    // Possible wins array
    const wins = [
        [$('#square1'), $('#square2'), $('#square3')],
        [$('#square4'), $('#square5'), $('#square6')],
        [$('#square7'), $('#square8'), $('#square9')],
        [$('#square1'), $('#square4'), $('#square7')],
        [$('#square2'), $('#square5'), $('#square8')],
        [$('#square3'), $('#square6'), $('#square9')],
        [$('#square1'), $('#square5'), $('#square9')],
        [$('#square3'), $('#square5'), $('#square7')]
    ];

    // Start with clean slate
    squares.removeClass();

    /* ////////////////////////////// PLAYER NAME JS HERE ///////////////////////// */
    // function to grab names from input values and place them in player.name
    function updateNames() {
        if ($('#p1').val() == '') {
            return;
        } else {
            player[0].name = $('#p1').val();
            $('.p1Name').html(player[0].name);
        }
        if ($('#p2').val() == '') {
            return;
        } else {
            player[1].name = $('#p2').val();
            $('.p2Name').html(player[1].name);
        }
    }

    // click handler to update names
    submitName.on('click', () => {
        updateNames();
        $('#player-turn').html(player[0].name);
        $('#p1').val('');
        $('#p2').val('');
    })

    /* ///////////////////// GAME PLAY AND LOGIC HERE /////////////////////////////// */
    // this function updates the HTML player turn
    function updateTurn() {
        if (playerTurn === 0) {
            $('#player-turn').html(player[0].name);
        } else {
            $('#player-turn').html(player[1].name);
        }
    };

    // function for blinking winner text
    function blinker() {
        $('.winner').fadeOut(500);
        $('.winner').fadeIn(500);
    }

    setInterval(blinker, 1000); // Run every second when winner is found

    // this function executes player move and rotates player turns
    function playerMove(e) {
        // check for taken square, and return out of the function
        if (e.target.className !== '') {
            return;
        }
        if (playerTurn === 0 && e.target.className === '') {
            // Make player turn 1, player 2 can go now
            playerTurn += 1;
            // assign player 1 marker to target square
            e.target.className = player[0].marker;
            // push the selected square to player array
            player[0].squares.push(e.target.id);
            // call update html player function
            $('body').css('backgroundColor', '#3900d4c5');
            updateTurn();
        } else if (playerTurn === 1 && e.target.className === '') {
            // make player turn 0, player 1 can go now
            playerTurn -= 1;
            // assign player 2 marker to target square
            e.target.className = player[1].marker;
            // push the selected square to player array
            player[1].squares.push(e.target.id);
            // call update html player function
            $('body').css('backgroundColor', '#faa200c7');
            updateTurn();
        }
    };

    // function to check for winner in game
    function checkWin() {
        if (gameOver == false) {
            // Loop though win possibilities for player[0]
            wins.forEach(function (sq) {
                if (sq[0].hasClass('x') &&
                    sq[1].hasClass('x') &&
                    sq[2].hasClass('x')) {
                    // update player wins html
                    $('#win-phrase').html(`Player ${player[0].name} Wins!`).addClass('winner');
                    // add 1 point to the score for player 1
                    player[0].score += 1;
                    // display player 1 score
                    $('#p1Score').html(`${player[0].score}`);
                    // toggle turn variable to disable click
                    playerTurn = -1;
                    // return function exit when complete
                    gameOver = true;
                    return gameOver;
                }
                // Loop though win possibilities for player[1]
                else if (sq[0].hasClass('o') &&
                    sq[1].hasClass('o') &&
                    sq[2].hasClass('o')) {
                    // update player wins html
                    $('#win-phrase').html(`Player ${player[1].name} Wins!`).addClass('winner');
                    // add 1 point to player 2 score
                    player[1].score += 1;
                    // display player 2 score
                    $('#p2Score').html(`${player[1].score}`);
                    // toggle turn variable to disable click
                    playerTurn = -1;
                    // return function to exit when complete
                    gameOver = true;
                    return gameOver;
                }
            });
        }
    };

    // click handler for game play
    $('.board').on('click', (event) => {
        playerMove(event);
        // check for a tie game
        checkWin();
        if (gameOver === false && player[0].squares.length === 4 && player[1].squares.length === 4 && playerTurn === 0) {
            checkWin();
        } else if (gameOver === false && player[0].squares.length === 5 && player[1].squares.length === 4 && playerTurn === 1) {
            // add 1 to the tie counter
            ties += 1;
            $('body').css('backgroundColor', '#f00000c7');
            // update tie score html
            $('#ties').html(ties);
            // print tie to win phrase
            $('#win-phrase').html('This game is a Tie, Try Again!');
        }
    });

    // new game button
    $('.new-game').on('click', function reset() {
        $('#win-phrase').html('Tic-Tac-Toe');
        squares.removeClass();
        player.forEach(function (pl) {
            pl.squares = [];
        })
        playerTurn = 0;
        gameOver = false;
        $('#player-turn').html(player[0].name);
        $('body').css('backgroundColor', 'white');
        // Remove winner class
        $('#win-phrase').removeClass('winner');
    });

    // reset scores and players and new game button
    $('.reset').on('click', function reset() {
        $('#win-phrase').html('Tic-Tac-Toe');
        squares.removeClass();
        player.forEach(function (pl) {
            pl.score = 0;
            pl.squares = [];
        });
        playerTurn = 0;
        gameOver = false;
        ties = 0;
        $('#p1Score').html(`${player[0].score}`);
        $('#p2Score').html(`${player[1].score}`);
        $('#player-turn').html(player[0].name = '1');
        $('#player-turn').html(player[1].name = '2');
        $('.p1Name').html('Player ' + player[0].name);
        $('.p2Name').html('Player ' + player[1].name);
        $('#ties').html(ties);
        $('body').css('backgroundColor', 'white');
        // Remove winner class
        $('#win-phrase').removeClass('winner');
    });

}); // end document ready