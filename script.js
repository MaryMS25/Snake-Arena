//Play Board é a TELA ou tabuleiro
/* Conteiner onde a cobra e a comida serão renderizadas */
const playBoard = document.querySelector("play-board");
//Pontuação atual do jogador
const scoreElement = document.querySelector(".score");
//Record (maior pontuação)
const highScoreElement = document.querySelector(".high-score");
//Controle de movimento 
/* Seleciona elementos <i> Icones Botões para Devices Mobiles */
const controls = document.querySelectorAll(".controls i");

//Cadastro de Variaveis

/* Variavel Boleana que indica se o jogo terminou */
let gameOver = false;
//Variavel para armazenar as coordenadas X e Y da comida 
let foodX, foodY;
//Armazena as coordenadas X e Y da cabeça da cobra(posição inicial de 5)
let snakeX = 5, snakeY = 5;
/* variavel para armazena a velocidade nas direções X e Y, inicalmente em 0, pq a cobra está parada */
let velocityX = 0, velocityY = 0;
// uma Array para armazena as coordenadas de cada segmento do corpo, primeiro o elemento é a cabeça
let snakeBody = [];
// variavel para armazenar o ID do intervalo que será usado para atualizar o jogo em um determinado ritmo.
let setIntervalId;
//Uma variavel para manter o controle da pontuação atual do jogador
let score = 0;



// Obtenha pontuação alta do armazenamento do local
/* Tenta recuperar o valor associado à chave high-score do armazenamento local do navegedor */
let highScore = localStorage.getItem("high-score")
/*  Se o localStorage retomar NULL (caso ele não exista), a variavel highscore será definida como 0  */


// Posição aleatoria entre 1 a 30 para a comida
/*  Gera coordendas aleatórias para a nova posição da comida */
const updateFoodPosition = () => {
    //retorna um numero de ponto flutunte psedoaleatório entre 0 e 1
    // 30: Multiplica o número aleatório por 30 para obter um valor entre o e quase 30
    // Math.floor(): Arredonda o resultado para o número inteiro mais proximo (entre 0 e 29)
    // +1: Adiciona 1 para garantir que as coordenadas da comida estejam entre 1 e 30.
    foodX = Math.floor(Math.random () * 30) +1;
    foodY = Math.floor(Math.random () * 30) +1;
}

//Função para lidar com o Fim do jogo
/* Função hadleGameOver = quando a cobra colide consigo mesma ou com as paredes do tabuleiro */

const hadleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! 😫 Aperto Ok para iniciar novamente...");
    location.reload();
}

// Função para Mudar a direção da cobrinha
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1)
        velocityX = 1
        velocityY = 0;
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key})));

//Começar o Game = init Game
const initGame = () => {
    if (gameOver) return hadleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"`;

    //Quando a cobra se alimenta 
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${higtScore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ) {
        return gameOver = true;
    }
}
