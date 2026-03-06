const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = {
    x: 270,
    y: 350,
    width: 60,
    height: 20,
    speed: 5
};
let fruits = [];
let score = 0;
let lives = 3;

// Captura das teclas
const keys = {};
document.addEventListener('keydown', (e) => { keys[e.key] = true; });
document.addEventListener('keyup', (e) => { keys[e.key] = false; });

// Função para gerar frutas aleatórias
function createFruit() {
    const x = Math.random() * (canvas.width - 20);
    fruits.push({ x: x, y: 0, width: 20, height: 20, speed: 2 + Math.random() * 3 });
}

// Atualiza o jogo
function update() {
    // Movimentação do jogador
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;

    // Atualiza frutas
    for (let i = 0; i < fruits.length; i++) {
        fruits[i].y += fruits[i].speed;

        // Colisão com jogador
        if (
            fruits[i].x < player.x + player.width &&
            fruits[i].x + fruits[i].width > player.x &&
            fruits[i].y + fruits[i].height > player.y &&
            fruits[i].y < player.y + player.height
        ) {
            score++;
            document.getElementById('score').textContent = score;
            fruits.splice(i, 1);
            i--;
        }
        // Fruta caiu no chão
        else if (fruits[i].y > canvas.height) {
            lives--;
            document.getElementById('lives').textContent = lives;
            fruits.splice(i, 1);
            i--;
            if (lives <= 0) {
                alert('Game Over! Sua pontuação: ' + score);
                document.location.reload();
            }
        }
    }
}

// Desenha o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha jogador
    ctx.fillStyle = '#ffeb3b';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Desenha frutas
    ctx.fillStyle = '#f44336';
    for (let fruit of fruits) {
        ctx.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
    }
}

// Loop do jogo
function gameLoop() {
    if (Math.random() < 0.02) createFruit(); // chance de gerar fruta
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();