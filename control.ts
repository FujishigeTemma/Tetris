import { Game } from "./game"

// コントローラー
$(function () {
    var game = new Game();

    $(document).on('keydown', function(e) {
        // Xボタン
        if(e.keyCode === 88) {
            game.rightRotationButton();
        }
        // Zボタン
        if(e.keyCode === 90) {
            game.leftRotationButton();
        }
        // ←ボタン
        if(e.keyCode === 37) {
            game.leftMoveButton();
        }
        // →ボタン
        if(e.keyCode === 39) {
            game.rightMoveButton();
        }
        // ↓ボタン
        if(e.keyCode === 40) {
            game.downButton();
        }
    });

    // スタートボタン
    document.getElementsByTagName("button")[0].onclick = function() {
        game.startButton();
    };
});