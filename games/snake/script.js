const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

// The snake starts as a list containing one position object
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100); 
}

function update() {
  // FIXED: Changed snake.x to snake[0].x and snake.y to snake[0].y
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
  // Check wall collisions
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
    return;
  }
  
  // Check self collisions
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      resetGame();
      return;
    }
  }

  // Add new head position to the front of the snake array
  snake.unshift(head);

  // Check if snake head shares the exact tile as the food object
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    // Remove the tail segment if no food was eaten to keep the snake moving forward
    snake.pop();
  }
}

function draw() {
  // Clear the canvas window with the dark blue background color
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the green snake body pieces onto our grid layout
  ctx.fillStyle = "#22c55e";
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });

  // Draw the red food target item onto our grid layout
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
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

gameLoop();

