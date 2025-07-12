// === Mood Selection (Index.html) ===
document.addEventListener('DOMContentLoaded', function () {
    const mood = document.getElementById('mood');
    const body = document.body;
  
    // Apply background class based on mood
    if (mood && body) {
      body.classList.remove('happy', 'angry', 'sad', 'anxious', 'dizzy', 'loneliness');
      if (mood.value !== '--') {
        body.classList.add(mood.value);
      }
  
      mood.addEventListener('change', function () {
        body.classList.remove('happy', 'angry', 'sad', 'anxious', 'dizzy', 'loneliness');
        if (this.value !== '--') {
          body.classList.add(this.value);
        }
        showMoodCard(this.value);
      });
  
      // Hide all cards initially
      showMoodCard(mood.value);
    }
  
    function showMoodCard(selectedMood) {
      for (let i = 1; i <= 6; i++) {
        const div = document.getElementById(`div${i}`);
        if (div) div.style.display = 'none';
      }
  
      const moodToDiv = {
        happy: 'div1',
        angry: 'div2',
        sad: 'div3',
        anxious: 'div4',
        dizzy: 'div5',
        loneliness: 'div6',
      };
  
      const showDivId = moodToDiv[selectedMood];
      if (showDivId) {
        const div = document.getElementById(showDivId);
        if (div) div.style.display = 'block';
      }
    }
  });
  
  // === Floating Emoji Animation ===
  const emojis = ['😊', '😡', '😢', '😱', '😵', '🥰'];
  const container = document.getElementById('emoji-float-container');
  
  function createFloatingEmoji() {
    if (!container) return;
    const emoji = document.createElement('span');
    emoji.className = 'floating-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 95 + 'vw';
    emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
    emoji.style.animationDuration = (Math.random() * 2 + 4) + 's';
    container.appendChild(emoji);
  
    setTimeout(() => {
      emoji.remove();
    }, 6000);
  }
  
  setInterval(createFloatingEmoji, 700);
  
  
  // === Relaxing Games (Game.html only) ===
  document.addEventListener("DOMContentLoaded", () => {
    const bubbleBtn = document.querySelector(".play-bubble-pop");
    const geometryBtn = document.querySelector(".play-geometry-dash");
  
    const bubbleContainer = document.getElementById("bubble-pop-container");
    const dashContainer = document.getElementById("geometry-dash-container");
  
    // Only attach game logic if buttons exist (i.e., on Game.html)
    if (bubbleBtn && geometryBtn && bubbleContainer && dashContainer) {
      bubbleBtn.addEventListener("click", () => {
        bubbleContainer.style.display = "block";
        dashContainer.style.display = "none";
        startBubblePopGame();
      });
  
      geometryBtn.addEventListener("click", () => {
        dashContainer.style.display = "block";
        bubbleContainer.style.display = "none";
        startGeometryDash();
      });
    }
  });
  
  
  // === Bubble Pop Game ===
  function startBubblePopGame() {
    const canvas = document.getElementById("bubbleCanvas");
    const ctx = canvas.getContext("2d");
    const scoreDisplay = document.getElementById("score");
  
    let bubbles = [];
    let score = 0;
  
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    function createBubble() {
      const radius = Math.random() * 20 + 10;
      const x = Math.random() * (canvas.width - 2 * radius) + radius;
      const y = canvas.height + radius;
      const speed = Math.random() * 2 + 1;
      bubbles.push({ x, y, radius, speed });
    }
  
    function drawBubble(bubble) {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(106, 199, 255, 0.7)";
      ctx.fill();
      ctx.strokeStyle = "#3a7ca5";
      ctx.stroke();
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      bubbles.forEach((bubble, index) => {
        bubble.y -= bubble.speed;
        drawBubble(bubble);
        if (bubble.y + bubble.radius < 0) {
          bubbles.splice(index, 1);
        }
      });
  
      requestAnimationFrame(animate);
    }
  
    canvas.onclick = function (e) {
      const rect = canvas.getBoundingClientRect();
      const xClick = e.clientX - rect.left;
      const yClick = e.clientY - rect.top;
  
      bubbles.forEach((bubble, index) => {
        const dx = bubble.x - xClick;
        const dy = bubble.y - yClick;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bubble.radius) {
          bubbles.splice(index, 1);
          score++;
          scoreDisplay.textContent = `Score: ${score}`;
        }
      });
    };
  
    // Reset
    bubbles = [];
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    clearInterval(window.bubbleInterval);
    window.bubbleInterval = setInterval(createBubble, 500);
    animate();
  }
  
  
  // === Geometry Dash Game ===
  // Geometry Dash Simple Clone
const gdashCanvas = document.getElementById('geometryDash');
if (gdashCanvas) {
    const ctx = gdashCanvas.getContext('2d');
    const ground = gdashCanvas.height - 40;
    let player = { x: 50, y: ground, w: 30, h: 30, vy: 0, jumping: false };
    let obstacles = [];
    let frame = 0;
    let score = 0;
    let gameOver = false;

    function resetGame() {
        player.y = ground;
        player.vy = 0;
        player.jumping = false;
        obstacles = [];
        frame = 0;
        score = 0;
        gameOver = false;
        document.getElementById('gdash-score').textContent = '';
        loop();
    }

    function drawPlayer() {
        ctx.fillStyle = "#4af";
        ctx.fillRect(player.x, player.y, player.w, player.h);
    }

    function drawObstacles() {
        ctx.fillStyle = "#f55";
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        });
    }

    function updateObstacles() {
        if (frame % 70 === 0) {
            // Make obstacles always on the ground and not too tall
            let maxHeight = player.h; // obstacle height should not exceed player height
            let height = 20 + Math.random() * (maxHeight - 10); // min 20, max player.h
            obstacles.push({
                x: gdashCanvas.width,
                y: ground + player.h - height, // so the bottom of the obstacle is at ground level
                w: 20 + Math.random() * 20,
                h: height
            });
        }
        obstacles.forEach(obs => obs.x -= 4);
        if (obstacles.length && obstacles[0].x + obstacles[0].w < 0) {
            obstacles.shift();
            score++;
        }
    }

    // FIXED COLLISION LOGIC
    function checkCollision() {
        for (let obs of obstacles) {
            // Only collide if rectangles truly overlap
            if (
                player.x < obs.x + obs.w &&
                player.x + player.w > obs.x &&
                player.y < obs.y + obs.h &&
                player.y + player.h > obs.y
            ) {
                return true;
            }
        }
        return false;
    }

    function drawGround() {
        ctx.fillStyle = "#888";
        ctx.fillRect(0, ground + player.h, gdashCanvas.width, 6);
    }

    function drawScore() {
        ctx.fillStyle = "#fff";
        ctx.font = "18px Poppins, Arial, sans-serif";
        ctx.fillText("Score: " + score, 20, 30);
    }

    function loop() {
        if (gameOver) return;
        ctx.clearRect(0, 0, gdashCanvas.width, gdashCanvas.height);
        drawGround();
        drawPlayer();
        drawObstacles();
        drawScore();
        updateObstacles();

        // Gravity
        player.vy += 0.7;
        player.y += player.vy;
        if (player.y > ground) {
            player.y = ground;
            player.vy = 0;
            player.jumping = false;
        }

        // Collision
        if (checkCollision()) {
            gameOver = true;
            document.getElementById('gdash-score').textContent = "Game Over! Score: " + score + " (Press Space or Tap to Restart)";
            return;
        }

        frame++;
        requestAnimationFrame(loop);
    }

    // Controls
    function jump() {
        if (!player.jumping && !gameOver) {
            player.vy = -12;
            player.jumping = true;
        } else if (gameOver) {
            resetGame();
        }
    }
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') jump();
    });
    gdashCanvas.addEventListener('mousedown', jump);
    gdashCanvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        jump();
    });

    // Start the game
    loop();
}
  
  