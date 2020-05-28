import { Tetrimino } from "./tetrimino"

// フィールドクラス
export class Field {
    
    width: number; // フィールドの幅
    height: number; // フィールドの高さ
    nextCount: number; // 次のテトリミノの数
    tetrimino: Tetrimino;
    nextTetriminos: Tetrimino[];
    tbl: number[][];
    gameOverFlg: boolean;
    startPositionX: number;
    startPositionY: number;
    positionX: number;
    positionY: number;
    lineCount: number;

    constructor(width: number, height: number, nextCount: number) {
        this.width = width; // フィールドの幅
        this.height = height; // フィールドの高さ
        this.nextCount = nextCount; // 次のテトリミノの数
        // フィールド初期化
        this.tbl = new Array(width);
        for(let x = 0; x < width; x++) {
            this.tbl[x] = new Array(height).fill(0);
        }
        // テトリミノ初期化
        this.tetrimino = new Tetrimino();
        this.nextTetriminos = new Array(this.nextCount);
        for(let i = 0; i < this.nextCount; i++) {
            this.nextTetriminos[i] = new Tetrimino();
        }
        // 開始位置設定
        this.initStartPosition();
        this.setStartPosition();
        this.gameOverFlg = false;
    }

    // テトリミノ開始位置初期設定
    initStartPosition() {
        this.startPositionX = Math.floor(this.width / 2) - 2; // テトリミノ開始位置X座標
        this.startPositionY = -1; // テトリミノ開始位置Y座標
    }

    // テトリミノ開始位置設定
    setStartPosition() {
        this.positionX = this.startPositionX;
        this.positionY = this.startPositionY;
    }

    // 指定座標のブロックを取得
    getPositionBlock(x, y) {
        // 該当座標にテトリミノがあればテトリミノのブロックを返す
        if (this.positionX <= x && x < this.positionX + Tetrimino.getSize()
            && this.positionY <= y && y < this.positionY + Tetrimino.getSize()
            && this.tetrimino.getPointBlock(x - this.positionX, y - this.positionY) > 0) {
            return this.tetrimino.getPointBlock(x - this.positionX, y - this.positionY);
        }
        return this.tbl[x][y];
    }

    // 次のテトリミノを取得
    getNextTetriminos() {
        return this.nextTetriminos;
    }

    // テトリミノ右回転
    rightRotation() {
        const newTetrimino = this.tetrimino.clone();
        newTetrimino.rightRotation();
        if (this.fieldCheck (this.positionX, this.positionY, newTetrimino)) {
            this.tetrimino = newTetrimino;
        }
    }

    // テトリミノ左回転
    leftRotation() {
        // 右回転と同様のため省略
    }

    // テトリミノ右移動
    rightMove() {
        if (this.fieldCheck (this.positionX + 1, this.positionY, this.tetrimino)) {
            this.positionX += 1;
        }
    }

    // テトリミノ左移動
    leftMove() {
        if (this.fieldCheck (this.positionX - 1, this.positionY, this.tetrimino)) {
            this.positionX -= 1;
        }
    }

    // テトリミノ下移動
    down() {
        if (this.fieldCheck (this.positionX, this.positionY + 1, this.tetrimino)) {
            this.positionY += 1;
            return false;
        } else {
            // 移動できなければフィールドに固定
            this.fixation();
            return true;
        }
    }

    // フィールドとテトリミノが被っていないか判定処理
    fieldCheck (x, y, tetrimino) {
        for (let i = 0; i < Tetrimino.getSize(); i++) {
            for (let j = 0; j < Tetrimino.getSize(); j++) {
                if (tetrimino.getPointBlock(i, j) > 0) {
                    if (x + i < 0 || x + i >= this.width || y + j >= this.height) {
                        return false;
                    } else if (this.tbl[x + i][y + j] > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // フィールド固定処理
    fixation() {
        // テトリミノをフィールドに固定
        for (let i = 0; i < Tetrimino.getSize(); i++) {
            for (let j = 0; j < Tetrimino.getSize(); j++) {
                if (this.tetrimino.getPointBlock(i, j) > 0) {
                    if (this.positionY + j >= 0) {
                        // ブロックをフィールドに設定
                        this.tbl[this.positionX + i][this.positionY + j] = this.tetrimino.getPointBlock(i, j);
                    }
                }
            }
        }

        // 行チェック処理
        this.lineCount = 0;
        for (let y = 0; y < this.height; y++) {
            let lineFlg = true;
            for (let x = 0; x < this.width; x++) {
                if (this.getPositionBlock(x, y) <= 0) {
                    lineFlg = false;
                    break;
                }
            }
            if (lineFlg) {
                // 消された行から上を下に移動
                for (let i = y; i >= 0; i--) {
                    for (let j = 0; j < this.width; j++) {
                        this.tbl[j][i] = this.tbl[j][i-1];
                    }
                }
                for (let j = 0; j < this.width; j++) {
                    this.tbl[j][0] = 0;
                }
                this.lineCount++;
            }
        }

        // フィールドからはみ出ているブロックを処理
        if (this.positionY < 0) {
            for (let i = 0; i < Tetrimino.getSize(); i++) {
                for (let j = 0; this.positionY + j < 0; j++) {
                    if (this.tetrimino.getPointBlock(i, j) > 0) {
                        if (this.positionY + j + this.lineCount < 0) {
                            // 最終的にはみ出ている場合はゲームオーバー
                            this.gameOverFlg = true;
                        } else {
                            // ブロックをフィールドに設定
                            this.tbl[this.positionX + i][this.positionY + j + this.lineCount] = this.tetrimino.getPointBlock(i, j);
                        }
                    }
                }
            }
        }

        // テトリミノを非表示
        this.positionY = this.height + 1;

        if (!this.gameOverFlg && !this.fieldCheck (this.startPositionX, this.startPositionY, this.nextTetriminos[0])) {
            // 次に出てくるテトリミノと重なる場合はゲームオーバー
            this.gameOverFlg = true;
        }
    }

    // 直前に消された行数を取得
    getLineCount() {
        return this.lineCount;
    }

    // 次のテトリミノを表示
    next() {
        if (!this.gameOverFlg) {
            // 次のテトリミノを設定
            this.tetrimino = this.nextTetriminos[0];
            for (let i = 0; i < this.nextTetriminos.length - 1; i++) {
                this.nextTetriminos[i] = this.nextTetriminos[i + 1];
            }
            this.nextTetriminos[this.nextTetriminos.length - 1] =  new Tetrimino();
            this.setStartPosition();
        }
    }

    // ゲームオーバーを判定
    checkGameOver() {
        return this.gameOverFlg;
    }

}