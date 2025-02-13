const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function startGame(gameName) {
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block";
    if (gameName === 'flappy') flappyBird();
    else if (gameName === 'snake') snakeGame();
    else if (gameName === 'tic-tac-toe') ticTacToe();
    else if (gameName === 'breakout') breakoutGame();
    else if (gameName === 'space-shooter') spaceShooter();
}

function flappyBird() {
    let birdY = 150, gravity = 1.5, velocity = 0;
    document.addEventListener("keydown", () => velocity = -10);
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        velocity += gravity;
        birdY += velocity;
        ctx.fillStyle = "yellow";
        ctx.fillRect(100, birdY, 20, 20);
        requestAnimationFrame(loop);
    }
    loop();
}

function snakeGame() {
    let snake = [{x: 10, y: 10}], dx = 10, dy = 0;
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") [dx, dy] = [0, -10];
        if (e.key === "ArrowDown") [dx, dy] = [0, 10];
        if (e.key === "ArrowLeft") [dx, dy] = [-10, 0];
        if (e.key === "ArrowRight") [dx, dy] = [10, 0];
    });
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.unshift({x: snake[0].x + dx, y: snake[0].y + dy});
        snake.pop();
        ctx.fillStyle = "green";
        snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));
        requestAnimationFrame(loop);
    }
    loop();
}

function breakoutGame() {
    let ballX = 160, ballY = 240, ballDX = 2, ballDY = -2, paddleX = 140;
    document.addEventListener("mousemove", e => paddleX = e.clientX - canvas.offsetLeft - 30);
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ballX += ballDX;
        ballY += ballDY;
        if (ballX <= 0 || ballX >= canvas.width) ballDX *= -1;
        if (ballY <= 0 || ballY >= canvas.height) ballDY *= -1;
        ctx.fillStyle = "red";
        ctx.fillRect(ballX, ballY, 10, 10);
        ctx.fillStyle = "blue";
        ctx.fillRect(paddleX, canvas.height - 20, 60, 10);
        requestAnimationFrame(loop);
    }
    loop();
}

function spaceShooter() {
    let spaceship = {x: 150, y: 430, width: 30, height: 30};
    let bullets = [];
    let enemies = [];
    let enemySpeed = 1;
    
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft" && spaceship.x > 0) spaceship.x -= 10;
        if (e.key === "ArrowRight" && spaceship.x < canvas.width - spaceship.width) spaceship.x += 10;
        if (e.key === " ") bullets.push({x: spaceship.x + spaceship.width / 2 - 2, y: spaceship.y, width: 4, height: 10});
    });
    
    function spawnEnemies() {
        if (Math.random() < 0.02) {
            let enemyX = Math.random() * (canvas.width - 30);
            enemies.push({x: enemyX, y: 0, width: 30, height: 30});
        }
    }
    
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        spawnEnemies();
        
        // Move bullets
        bullets.forEach((bullet, index) => {
            bullet.y -= 5;
            if (bullet.y < 0) bullets.splice(index, 1);
            ctx.fillStyle = "red";
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        // Move enemies
        enemies.forEach((enemy, index) => {
            enemy.y += enemySpeed;
            if (enemy.y > canvas.height) enemies.splice(index, 1);
            ctx.fillStyle = "green";
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });

        // Draw spaceship
        ctx.fillStyle = "blue";
        ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
        requestAnimationFrame(loop);
    }
    
    loop();
}
