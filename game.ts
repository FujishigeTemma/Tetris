import { Field } from "./field";
import { View } from "./view"

// ゲームクラス
export class Game {

    private view: View;
    private field: Field;

    private score: number;
    private line: number;
    private level: number;
    private downTime: number;
    private nextTime: number;
    private stopFlg: boolean;
    private timeout: NodeJS.Timeout;
    private nextTimeout: NodeJS.Timeout;

    // 使用するフィールドクラスを取得
    static getFieldClass() {
        return Field;
    }

    // 使用するビュークラスを取得
    static getViewClass() {
        return View;
    }

    static getWidth() {return 10;}
    static getHeight() {return 20;}
    static getNextCount() {return 3;}
    static getScoreTable() {return [0, 10, 30, 60, 100];}

    constructor() {
        const viewClass = Game.getViewClass();
        this.view = new viewClass(Game.getWidth(), Game.getHeight(), Game.getNextCount());
        this.startSettings();
        this.view.viewScore (this.score, this.line, this.level)
        this.stopFlg = true;
    }

    startSettings() {
        this.score = 0; // 初期スコア
        this.line = 0;
        this.level = 1;
        this.downTime = 2000; // 初期落下時間 2秒
        this.nextTime = 500; // 初期固定後時間 0.5秒
    }

    // startボタン操作
    startButton() {
        clearTimeout(this.timeout); // 落下時間キャンセル
        clearTimeout(this.nextTimeout); // 固定時間キャンセル
        const fieldClass = Game.getFieldClass();
        this.field = new fieldClass(Game.getWidth(), Game.getHeight(), Game.getNextCount());
        this.startSettings();
        this.stopFlg = false; // 操作停止フラグ
        // 表示更新
        this.view.viewField(this.field)
        this.view.viewNextTetriminos(this.field.getNextTetriminos());
        this.view.viewScore (this.score, this.line, this.level)
        this.view.viewMessage(0);
        const self = this;
        this.timeout = setTimeout(function(){self.down()},this.downTime); // 自動落下処理
    }

    // 落下時間更新
    updateDownTime() {
        this.downTime = 2000 - (this.level - 1) % 20 * 100 - Math.floor((this.level - 1) / 20) * 10;
    }

    // 固定後時間更新
    updateNextTime() {
        this.nextTime = 500 - Math.floor((this.level - 1) / 20) * 50;
    }

    updateScore() {
        this.score += Game.getScoreTable()[this.field.getLineCount()];
    }

    updateLevel() {
        this.level = Math.floor(this.line / 10) + 1;
    }

    // 右回転操作
    rightRotationButton() {
        if (!this.stopFlg) {
            this.field.rightRotation();
            this.view.viewField(this.field);
        }
    }

    // 左回転操作
    leftRotationButton() {
        if (!this.stopFlg) {
            this.field.leftRotation();
            this.view.viewField(this.field);
        }
    }

    // 右移動操作
    rightMoveButton() {
        if (!this.stopFlg) {
            this.field.rightMove();
            this.view.viewField(this.field);
        }
    }

    // 左移動操作
    leftMoveButton() {
        if (!this.stopFlg) {
            this.field.leftMove();
            this.view.viewField(this.field);
        }
    }

    // 下移動操作
    downButton() {
        if (!this.stopFlg) {
            this.down();
        }
    }

    // 下移動処理
    down() {
        // 他の自動落下処理をキャンセル
        clearTimeout(this.timeout);
        const self = this;
        // 下移動処理
        if(this.field.down()) {
            // ブロックが固定された場合
            // 操作受付を停止
            this.stopFlg = true;
            // スコア更新
            this.line += this.field.getLineCount();
            this.updateScore();
            this.updateLevel();
            // 表示更新
            this.view.viewField(this.field);
            this.view.viewScore (this.score, this.line, this.level)
            this.view.viewMessage(this.field.getLineCount());
            // 落下時間、固定後時間更新
            this.updateDownTime();
            this.updateNextTime();
            // ゲームオーバーの場合はゲームオーバー表示して終了
            if (this.field.checkGameOver()) {
                this.view.viewMessage(-1);
                return;
            }
            // 指定時間後に次処理呼出
            this.nextTimeout = setTimeout(function(){self.next()}, this.nextTime);
        } else {
            // 下移動できた場合
            // 表示更新
            this.view.viewField(this.field);
            // 自動落下処理
            this.timeout = setTimeout(function(){self.down()},this.downTime);
        }
    }

    // 次処理
    next() {
        // 他の次処理をキャンセル
        clearTimeout(this.nextTimeout);
        // 操作受付を再開
        this.stopFlg = false;
        // フィールドの次処理呼出
        this.field.next();
        // 表示更新
        this.view.viewField(this.field);
        this.view.viewNextTetriminos(this.field.getNextTetriminos());
        // 自動落下処理
        const self = this;
        this.timeout = setTimeout(function(){self.down()},this.downTime);
    }

}