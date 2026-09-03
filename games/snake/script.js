const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let tileCountX, tileCountY;

let snake = [];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  tileCountX = Math.floor(canvas.width / gridSize);
  tileCountY = Math.floor(canvas.height / gridSize);
  
  resetGame();
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100); 
}

function update() {
  // CRITICAL FIX: Explicitly targeting array index [0] for the head coordinates
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
  // Dynamic screen border checking
  if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
    resetGame();
    return;
  }
  
  // Body chunk collision loop check
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      resetGame();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#22c55e";
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCountX);
  food.y = Math.floor(Math.random() * tileCountY);
}

function resetGame() {
  const startX = Math.floor(tileCountX / 2);
  const startY = Math.floor(tileCountY / 2);
  snake = [{ x: startX, y: startY }];
  dx = 0;
  dy = 0;
  score = 0;
  generateFood();
}

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":    if (dy === 0) { dx = 0; dy = -1; } break;
    case "ArrowDown":  if (dy === 0) { dx = 0; dy = 1; } break;
    case "ArrowLeft":  if (dx === 0) { dx = -1; dy = 0; } break;
    case "ArrowRight": if (dx === 0) { dx = 1; dy = 0; } break;
  }
});

// Watch window dimensions to automatically size the play box
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
gameLoop();

