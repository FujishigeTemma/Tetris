// テトリミノクラス
export class Tetrimino {
    // テトリミノのサイズを取得
    static getSize(): number {
        return 4;
    }

    // テトリミノの種類ごとのブロック位置(ミノの形)を指定
    static getTypePointArray(): number[][][] {
        return [
            [[0,1],[1,1],[2,1],[3,1]], // 棒形
            [[1,0],[1,1],[2,0],[2,1]], // 正方形
            [[0,1],[1,0],[1,1],[2,0]], // S字
            [[0,0],[1,0],[1,1],[2,1]], // Z字
            [[0,0],[0,1],[1,1],[2,1]], // J字
            [[0,1],[1,1],[2,0],[2,1]], // L字
            [[0,1],[1,0],[1,1],[2,1]]  // T字
        ];
    }

    // テトリミノの種類ごとのブロック位置を取得
    static getTypePoint(type: number) {
        return this.getTypePointArray()[type - 1];
    }

    // テトリミノの種類をランダムに取得
    static getRandomType(): number {
        return Math.floor(Math.random() * this.getTypePointArray().length) + 1;
    }

    // 回転時の回転範囲取得
    static getRotationSize(type: number) {
        if (type === 1) {
            return 3;
        } else if (type === 2) {
            return -1;
        }
        return 2;
    }

    private tbl: number[][];
    private rotationSize: number;

    constructor(tetrimino?: Tetrimino) {
        // クローン用
        if (tetrimino) {
            this.tbl = tetrimino.tbl;
            this.rotationSize = tetrimino.rotationSize;
            return;
        }
        // 配列初期化 0埋め
        this.tbl = new Array(Tetrimino.getSize());
        for(let x = 0; x < Tetrimino.getSize(); x++) {
            this.tbl[x] = new Array(Tetrimino.getSize()).fill(0);
        }
        const type = Tetrimino.getRandomType();
        // 配列に初期ブロック位置を指定
        const typePoint = Tetrimino.getTypePoint(type);
        for(let i = 0; i < typePoint.length; i++) {
            const point = typePoint[i];
            this.tbl[point[0]][point[1]] = type;
        }
        // 回転時の回転範囲
        this.rotationSize = Tetrimino.getRotationSize(type);
    }


    // クローン
    clone() {
        return new Tetrimino(this);
    }

    // テトリミノ右回転
    rightRotation() {
        // 正方形の場合は回転しない
        if (this.rotationSize === -1) {
            return;
        }
        // 新規配列初期化 0埋め
        const newtbl = new Array(Tetrimino.getSize());
        for(let x = 0; x < Tetrimino.getSize(); x++) {
            newtbl[x] = new Array(Tetrimino.getSize()).fill(0);
        }
        // 右回転
        for (let i = 0; i <= this.rotationSize; i++) {
            for (let j = 0; j <= this.rotationSize; j++) {
                newtbl[i][j] = this.tbl[j][this.rotationSize-i];
            }
        }
        this.tbl = newtbl;
    }

    // テトリミノ左回転
    leftRotation() {
        // 正方形の場合は回転しない
        if (this.rotationSize === -1) {
            return;
        }
        // 新規配列初期化 0埋め
        const newtbl = new Array(Tetrimino.getSize());
        for(let x = 0; x < Tetrimino.getSize(); x++) {
            newtbl[x] = new Array(Tetrimino.getSize()).fill(0);
        }
        // 右回転
        for (let i = 0; i <= this.rotationSize; i++) {
            for (let j = 0; j <= this.rotationSize; j++) {
                newtbl[i][j] = this.tbl[j][this.rotationSize-i];
            }
        }
        this.tbl = newtbl;
    }

    // 該当ポイントのデータを返す
    getPointBlock(x, y) {
        return this.tbl[x][y];
    }
}
