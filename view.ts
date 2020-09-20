import {Field} from "./field";
import {Tetrimino} from "./tetrimino";

// ビュークラス
export class View {

    // ブロックの種類ごとの色を指定
    static getTypeColorArray(): string[] {
        return ["cyan", "yellow", "green", "red", "blue", "orange", "magenta"]
    }

    width: number; // フィールドの幅
    height: number; // フィールドの高さ
    nextCount: number; // 次のテトリミノの数

    constructor(width: number, height: number, nextCount: number) {
        this.width = width;
        this.height = height;
        this.nextCount = nextCount;
        // 画面表示初期化
        this.initFieldView(width, height);
        this.initNextTetriminoView();
    }

    // フィールド表示初期化
    initFieldView(width: number, height: number) {
        [...Array(width * height).keys()].forEach(i => {
            const $div = document.createElement('div')
            $div.id = i.toString()
            document.getElementsByClassName("field")[0].appendChild($div)
        })

    }

    // 次テトリミノ表示初期化
    initNextTetriminoView() {
        // 省略
    }

    // フィールド表示更新
    viewField(field: Field) {
        // 省略
    }

    // 次テトリミノ表示更新
    viewNextTetriminos(tetriminos: Tetrimino[]) {
        // 省略
    }

    // スコア、ライン、レベル表示更新
    viewScore(score: number, line: number, level: number) {
        // 省略
    }

    // メッセージ表示
    viewMessage(type: number) {
        let message = "";
        switch (type) {
            case 1:
                message = "SINGLE!"
                break;
            case 2:
                message = "DOUBLE!"
                break;
            case 3:
                message = "TRIPLE!"
                break;
            case 4:
                message = "TETRIS!"
                break;
            case -1:
                message = "GAME OVER!"
                break;
        }
        document.getElementsByClassName("message")[0].textContent = message;
    }
}