/**
 * Created by dmtzhangwei on 2016/10/13.
 */

var board = new Array();
var score = 0;
var has_conflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
var success_string = 'Success';
var gameover_string = 'GameOver';

$(document).ready(function () {
    prepare_for_mobile();
    new_game();
});

function new_game() {
    init();
    generate_one_number();
    generate_one_number();
}

function init() {

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var grid_cell = $('#grid_cell_' + i + '_' + j);
            grid_cell.css('top', get_pos_top(i, j));
            grid_cell.css('left', get_pos_left(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        has_conflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            has_conflicted[i][j] = false;
        }
    }
    update_board_view();
    score = 0;
    update_score(score);
}

//更新棋局
function update_board_view() {
    $('.number_cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j +
                '"></div>');
            var number_cell = $('#number_cell_' + i + '_' + j);
            if (board[i][j] == 0) {
                number_cell.css('width', '0px');
                number_cell.css('height', '0px');
                number_cell.css('top', get_pos_top(i, j) + cell_side_length / 2);
                number_cell.css('left', get_pos_left(i, j) + cell_side_length / 2);

            } else {
                number_cell.css('width', cell_side_length);
                number_cell.css('height', cell_side_length);
                number_cell.css('top', get_pos_top(i, j));
                number_cell.css('left', get_pos_left(i, j));
                number_cell.css('background-color', get_number_background_color(board[i][j]));
                number_cell.css('color', get_number_color(board[i][j]));
                number_cell.css((board[i][j]));
            }
            has_conflicted[i][j] = false;
        }
    }

    $('.number_cell').css('line-height', cell_side_length + 'px');
    $('.number_cell').css('font-size', 0.6 * cell_side_length + 'px');
}

function generate_one_number() {
    if (nospace(board)) {
        return false;
    }

    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var time = 0;
    while (time < 50) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        time++;
    }
    if (time == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var rand_number = Math.random() < 0.5 ? 2 : 4;

    board[randx][randy] = rand_number;
    show_number_with_animation(randx, randy, rand_number);
    return true;
}

//自适应处理
function prepare_for_mobile() {
    if (document_width > 500) {
        grid_container_width = 500;
        cell_side_length = 100;
        cell_space = 20;
    }
    $('#grid_container').css('width', grid_container_width - 2 * cell_space);
    $('#grid_container').css('height', grid_container_width - 2 * cell_space);
    $('#grid_container').css('padding', cell_space);
    $('#grid_container').css('border-radius', 0.02 * grid_container_width);
    $('.grid_cell').css('width', cell_side_length);
    $('.grid_cell').css('height', cell_side_length);
    $('.grid_cell').css('border-radius', 0.02 * grid_container_width);

}



