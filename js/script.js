const canvasElement = document.querySelector('canvas');
const canvasCTX = canvasElement.getContext('2d');
const lineWidth = 15;
gapX = 10;
const score = {
    human: 0,
    computer: 0,
    increaseHuman: function () {
        this.human++;
    },
    increaseComputer: function () {
        this.computer++;
    },
    draw: function () {
        canvasCTX.font = "bold 72px Arial";
        canvasCTX.textAlign = "center";
        canvasCTX.textBaseline = "top";
        canvasCTX.fillStyle = "#01341D";
        canvasCTX.fillText(this.human, field.w / 4, 50);
        canvasCTX.fillText(this.computer, field.w / 2 + field.w / 4, 50);
    }
}

const mouse = {
    x: 0,
    y: 0,
};


const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function () {
        canvasCTX.fillStyle = "#286047";
        canvasCTX.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}

// Desenho da linha central
const line = {
    w: 15,
    h: field.h,
    draw: function () {
        canvasCTX.fillStyle = "#ffffff"
        canvasCTX.fillRect(
            field.w / 2 - this.w / 2,
            0,
            this.w,
            this.h
        );
    }
}

//Desenho da raquete esquerda
const leftPaddle = {
    x: gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function () {
        this.y = mouse.y;
    },
    draw: function () {
        canvasCTX.fillStyle = "#ffffff"
        canvasCTX.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    },
}

//Desenho da raquete direita
const rigthPaddle = {
    x: field.w - line.w - gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    speed: 5,
    _move: function () {
        if(this.y + this.h / 2 < ball.h + ball.r){
            this.y += this.speed ;
        }else{
            this.y -= this.speed;
        }
        this.y = ball.y;
    },
    speedUp: function(){
        this.speed++ ;
    },
    
    draw: function () {
        canvasCTX.fillStyle = "#ffffff"
        canvasCTX.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    },
}


const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    speed: 10,
    directionX: 1,
    directionY: 1,
    _calcPosition: function () {
        // verifica se jogador (humano) fez um ponto
        if (this.x > field.w - this.r - rigthPaddle.w - gapX) {
            // calcula a posição da raquete no eixo y
            if (
                this.y + this.r > rigthPaddle.y &&
                this.y - this.r < rigthPaddle.y + rigthPaddle.h
            ) {
                // rebater a bola
                this._reverseX();
            } else {
                // fazer o ponto
                score.increaseHuman();
                this._pointUp();
            }
        }

        // Verifica se o jogador 2 (computador)fez ponto
        if (this.x < this.r + leftPaddle.w + gapX) {
            //     // calcula a posição da raquete no eixo y
            if (
                this.y + this.r > leftPaddle.y &&
                this.y - this.r < leftPaddle.y + leftPaddle.h

            ) {
                // rebate a bola
                this._reverseX();

            } else {
                // fazer ponto
                score.increaseComputer();
                this._pointUp();

            }
        }

        // calcula a posição vertical da bola no eixo Y
        if (
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)) {
            this._reverseY();
        }
    },
    _reverseX: function () {
        // 1 * -1 = -1
        // -1 * -1 = 1
        this.directionX *= -1;
    },
    _reverseY: function () {
        // 1 * -1 = -1
        // -1 * -1 = 1
        this.directionY *= -1;
    },
    _speedUp: function(){
        this.speed += 3;
    },
    _pointUp: function () {
        this.x = field.w / 2;
        this.y = field.h / 2;

        this._reverseX();
        this._speedUp()
        rigthPaddle._speedUp();

    },
    _move: function () {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    },
    draw: function () {
        // Desenho da bola
        canvasCTX.fillStyle = "#ffffff";
        canvasCTX.beginPath();
        canvasCTX.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCTX.fill();

        this._calcPosition();
        this._move();
    },
}


function setup() {
    canvasElement.width = canvasCTX.width = window.innerWidth;
    canvasElement.height = canvasCTX.height = window.innerHeight;
}


// Montagem dos objetos
function draw() {
    field.draw();
    line.draw();

    leftPaddle.draw();
    rigthPaddle.draw();

    ball.draw();
    score.draw();

}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    )
})()

function main() {
    animateFrame(main);
    draw();
}

setup();
main();

canvasElement.addEventListener('mousemove', function (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});





// OBSOLETO

// canvasCTX.fillStyle = "#286047";
//     canvasCTX.fillRect(0, 0, window.innerWidth, window.innerHeight);

//     // Desenho da linha central
//     canvasCTX.fillStyle = "#ffffff"
//     canvasCTX.fillRect(
//         window.innerWidth / 2 - lineWidth / 2,
//         0,
//         lineWidth,
//         window.innerHeight
//     );

//     //Desenho da raquete esquerda
//     canvasCTX.fillStyle = "#ffffff"
//     canvasCTX.fillRect(gapX, 240, lineWidth, 200);

//     //Desenho da raquete direita
//     canvasCTX.fillStyle = "#ffffff"
//     canvasCTX.fillRect(
//         window.innerWidth - lineWidth - gapX,
//         200,
//         lineWidth,
//         200
//     );

//     // Desenho da bola
//     canvasCTX.fillStyle = "#ffffff";
//     canvasCTX.beginPath();
//     canvasCTX.arc(120, 240, 20, 0, 2 * Math.PI, false);
//     canvasCTX.fill();

// setInterval()