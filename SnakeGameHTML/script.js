function pressArrowUp() {
    if (direction !== "down") { // No permitir que el gusano vaya hacia abajo si ya está en movimiento hacia arriba
      direction = "up";
    }
  }

  function pressArrowDown() {
    if (direction !== "up") { // No permitir que el gusano vaya hacia arriba si ya está en movimiento hacia abajo
      direction = "down";
    }
  }

  function pressArrowLeft() {
    if (direction !== "right") { // No permitir que el gusano vaya hacia la derecha si ya está en movimiento hacia la izquierda
      direction = "left";
    }
  }

  function pressArrowRight() {
    if (direction !== "left") { // No permitir que el gusano vaya hacia la izquierda si ya está en movimiento hacia la derecha
      direction = "right";
    }
  }

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const cellSize = 10;
  const gridSize = canvas.width / cellSize;
  const speed = 150; // Milliseconds between each update

  let snake = [
  { x: gridSize / 2, y: gridSize / 2 },
  { x: gridSize / 2 - 1, y: gridSize / 2 },
  { x: gridSize / 2 - 2, y: gridSize / 2 },

  ];
  let direction = "right";
  let food = {};

  function generateFood() {
  food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
  };
  }

  function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "green";
  snake.forEach(segment => {
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  });

  // Draw the food
  ctx.fillStyle = "#F80000";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
  }

  function update() {
  // Move the snake
  const head = { ...snake[0] };
  switch (direction) {
      case "up":
      head.y -= 1;
      break;
      case "down":
      head.y += 1;
      break;
      case "left":
      head.x -= 1;
      break;
      case "right":
      head.x += 1;
      break;
  }
  snake.unshift(head);

  // Check for collisions
  if (head.x === food.x && head.y === food.y) {
      generateFood();
  } else {
      snake.pop();
  }

  if (
      head.x < 0 || head.x >= gridSize ||
      head.y < 0 || head.y >= gridSize ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
      alert("Game Over!");
      resetGame();
  }

  draw();
  }


  function resetGame() {
  snake = [{ x: gridSize / 2, y: gridSize / 2 },
           { x: gridSize / 2 - 1, y: gridSize / 2 },
           { x: gridSize / 2 - 2, y: gridSize / 2 },];
  
  direction = "right";
  generateFood();
  }

  document.addEventListener("keydown", event => {
  switch (event.key) {
      case "ArrowUp":
      direction = "up";
      break;
      case "ArrowDown":
      direction = "down";
      break;
      case "ArrowLeft":
      direction = "left";
      break;
      case "ArrowRight":
      direction = "right";
      break;
  }
  });

  generateFood();
  setInterval(update, speed);
