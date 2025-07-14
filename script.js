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
  
    const huntBtn = document.querySelector(".play-hunt-chase");
    const huntContainer = document.getElementById("hunt-chase-container");
  
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

      huntBtn.addEventListener("click", () => {
        huntContainer.style.display = "block";
        bubbleContainer.style.display = "none";
        dashContainer.style.display = "none";
        startHuntChaseGame();
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
  
// === Hunt & Chase Game ===
let huntGameActive = false;
let huntGameState = null;

function startHuntChaseGame() {
    huntGameActive = true;
    const canvas = document.getElementById('huntCanvas');
    const ctx = canvas.getContext('2d');
    const statusDisplay = document.getElementById('hunt-status');
    const scoreDisplay = document.getElementById('hunt-score');
    
    // Game state
    let gameStarted = false;
    let gameOver = false;
    let winner = '';
    let timeElapsed = 0;
    let hunterInLightTime = 0;
    let hunterInLight = false;
    
    // Players
    const hunter = {
        x: 100,
        y: 100,
        size: 20,
        speed: 4.5,  // Increased hunter speed
        color: '#e74c3c',
        keys: { w: false, a: false, s: false, d: false },
        lastMove: 'd'
    };
    
    const prey = {
        x: canvas.width - 100,
        y: canvas.height - 100,
        size: 20,
        speed: 3.5,
        color: '#3498db',
        keys: { up: false, left: false, down: false, right: false },
        lastMove: 'left'
    };
    
    // Obstacles
    const obstacles = [
        { x: 200, y: 150, w: 80, h: 20 },
        { x: 500, y: 300, w: 20, h: 80 },
        { x: 300, y: 450, w: 120, h: 20 },
        { x: 150, y: 250, w: 20, h: 100 },
        { x: 600, y: 100, w: 20, h: 60 }
    ];

    function drawPlayer(player) {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
        // Add a small indicator for direction
        ctx.fillStyle = '#fff';
        ctx.fillRect(player.x - 2, player.y - player.size/2 - 2, 4, 4);
    }

    function drawObstacles() {
        ctx.fillStyle = '#95a5a6';
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        });
    }

    function checkCollisionRect(x, y, size, obstacle) {
        return (
            x + size/2 > obstacle.x &&
            x - size/2 < obstacle.x + obstacle.w &&
            y + size/2 > obstacle.y &&
            y - size/2 < obstacle.y + obstacle.h
        );
    }

    function checkPlayerCollision() {
        const dx = hunter.x - prey.x;
        const dy = hunter.y - prey.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (hunter.size + prey.size) / 2;
    }

    function updatePlayer(player) {
        let newX = player.x;
        let newY = player.y;
        let moved = false;
        if (player === hunter) {
            if (player.keys.w) { newY -= player.speed; player.lastMove = 'w'; moved = true; }
            if (player.keys.s) { newY += player.speed; player.lastMove = 's'; moved = true; }
            if (player.keys.a) { newX -= player.speed; player.lastMove = 'a'; moved = true; }
            if (player.keys.d) { newX += player.speed; player.lastMove = 'd'; moved = true; }
        } else {
            if (player.keys.up) { newY -= player.speed; player.lastMove = 'up'; moved = true; }
            if (player.keys.down) { newY += player.speed; player.lastMove = 'down'; moved = true; }
            if (player.keys.left) { newX -= player.speed; player.lastMove = 'left'; moved = true; }
            if (player.keys.right) { newX += player.speed; player.lastMove = 'right'; moved = true; }
        }
        // Boundary checking
        if (newX - player.size/2 < 0) newX = player.size/2;
        if (newX + player.size/2 > canvas.width) newX = canvas.width - player.size/2;
        if (newY - player.size/2 < 0) newY = player.size/2;
        if (newY + player.size/2 > canvas.height) newY = canvas.height - player.size/2;
        // Wall collision: try X move, then Y move, revert if collides
        let collided = false;
        for (let obs of obstacles) {
            if (checkCollisionRect(newX, player.y, player.size, obs)) collided = true;
        }
        if (!collided) {
            player.x = newX;
        }
        collided = false;
        for (let obs of obstacles) {
            if (checkCollisionRect(player.x, newY, player.size, obs)) collided = true;
        }
        if (!collided) {
            player.y = newY;
        }
    }

    function drawTorchEffect() {
        // Create a temporary canvas for torch effect
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Draw grey background (only for hunter)
        if (!mpGameActive || mpRole === 'hunter') {
            tempCtx.fillStyle = 'black';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        } else {
            tempCtx.fillStyle = 'black';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }
        
        // Draw torch effect (only for prey)
        if (!mpGameActive || mpRole === 'prey') {
            tempCtx.save();
            tempCtx.globalCompositeOperation = 'destination-out';
            let angle = 0;
            switch (prey.lastMove) {
                case 'up': angle = -Math.PI/2; break;
                case 'down': angle = Math.PI/2; break;
                case 'left': angle = Math.PI; break;
                case 'right': angle = 0; break;
                default: angle = 0;
            }
            const torchLength = 180;
            const torchWidth = Math.PI/2;  // Wider torch angle
            tempCtx.beginPath();
            tempCtx.moveTo(prey.x, prey.y);
            tempCtx.arc(prey.x, prey.y, torchLength, angle - torchWidth/2, angle + torchWidth/2);
            tempCtx.lineTo(prey.x, prey.y);
            tempCtx.closePath();
            tempCtx.fill();
            tempCtx.restore();
        }
        
        // Draw obstacles on temp canvas to block light
        tempCtx.fillStyle = '#333333';
        obstacles.forEach(obs => {
            tempCtx.fillRect(obs.x, obs.y, obs.w, obs.h);
        });
        
        // Draw the temp canvas onto main canvas
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.restore();
    }

    function isHunterInTorch() {
        let angle = 0;
        switch (prey.lastMove) {
            case 'up': angle = -Math.PI/2; break;
            case 'down': angle = Math.PI/2; break;
            case 'left': angle = Math.PI; break;
            case 'right': angle = 0; break;
            default: angle = 0;
        }
        const torchLength = 180;
        const torchWidth = Math.PI/2;  // Wider torch angle

        // Vector from prey to hunter
        const dx = hunter.x - prey.x;
        const dy = hunter.y - prey.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > torchLength) return false; // Out of range
        
        // Check if line of sight is blocked by obstacles
        const steps = Math.max(10, dist/10);
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const checkX = prey.x + dx * t;
            const checkY = prey.y + dy * t;
            
            for (let obs of obstacles) {
                if (checkCollisionRect(checkX, checkY, 5, obs)) {
                    return false; // Line of sight blocked
                }
            }
        }
        
        // Angle from prey to hunter
        let hunterAngle = Math.atan2(dy, dx);
        // Normalize angles to [-PI, PI]
        let diff = ((hunterAngle - angle + Math.PI*3) % (Math.PI*2)) - Math.PI;
        return Math.abs(diff) < torchWidth/2;
    }

    function drawGame() {
        // Clear canvas with appropriate background
        if (!mpGameActive || mpRole === 'hunter') {
            ctx.fillStyle = '#333333'; // Grey background for hunter
        } else {
            ctx.fillStyle = 'black'; // Black background for prey
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw torch effect (only for prey)
        if (!mpGameActive || mpRole === 'prey') {
            drawTorchEffect();
        }
        
        // Draw obstacles
        drawObstacles();
        
        // Draw players
        drawPlayer(hunter);
        drawPlayer(prey);
        
        // Draw timer (only in single player)
        if (!mpGameActive && gameStarted && !gameOver) {
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.fillText(`Time: ${Math.floor(timeElapsed)}s`, 10, 30);
        }
        
        // Draw hunter in light timer
        if (hunterInLight && !gameOver && (!mpGameActive || mpRole === 'prey')) {
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Hunter spotted! ${(1 - hunterInLightTime).toFixed(1)}s`, canvas.width/2, 30);
            ctx.textAlign = 'left';
        }
    }

    function gameLoop() {
        if (!gameStarted) {
            drawGame();
            requestAnimationFrame(gameLoop);
            return;
        }
        if (gameOver) {
            drawGame();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(winner, canvas.width/2, canvas.height/2);
            if (!mpGameActive) {
                ctx.font = '24px Arial';
                ctx.fillText('Press SPACE to restart', canvas.width/2, canvas.height/2 + 50);
            }
            ctx.textAlign = 'left';
            return;
        }
        
        // Update players
        updatePlayer(hunter);
        updatePlayer(prey);
        
        // Check if hunter is in torchlight
        const hunterInTorch = isHunterInTorch();
        if (hunterInTorch) {
            if (!hunterInLight) {
                hunterInLight = true;
                hunterInLightTime = 0;
            } else {
                hunterInLightTime += 0.016; // About 1/60th of a second
                if (hunterInLightTime >= 1) {
                    gameOver = true;
                    winner = 'Prey Wins!';
                    statusDisplay.textContent = 'Prey spotted the hunter!';
                }
            }
        } else {
            hunterInLight = false;
            hunterInLightTime = 0;
        }
        
        // Check for collision
        if (checkPlayerCollision()) {
            gameOver = true;
            winner = 'Hunter Wins!';
            statusDisplay.textContent = 'Hunter caught the prey!';
        }
        
        // Check if prey survived for 60 seconds
        if (timeElapsed >= 60) {
            gameOver = true;
            winner = 'Prey Wins!';
            statusDisplay.textContent = 'Prey survived!';
        }
        
        drawGame();
        requestAnimationFrame(gameLoop);
    }

    huntGameState = {
        hunter, prey, get gameStarted() { return gameStarted; }, set gameStarted(v) { gameStarted = v; },
        get gameOver() { return gameOver; }, set gameOver(v) { gameOver = v; },
        statusDisplay, gameLoop
    };

    // Timer
    const timer = setInterval(() => {
        if (gameStarted && !gameOver) {
            timeElapsed += 0.1;
        }
    }, 100);
    
    // Start the game loop
    gameLoop();
    
    // Cleanup function
    return () => {
        clearInterval(timer);
        huntGameActive = false;
        huntGameState = null;
    };
}

document.addEventListener('keydown', (e) => {
    if (!huntGameActive || !huntGameState) return;
    const { hunter, prey, gameStarted, gameOver, statusDisplay, gameLoop } = huntGameState;
    // Prevent scrolling for arrow keys and spacebar during the game
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
    }
    if (e.code === 'Space') {
        if (!huntGameState.gameStarted) {
            huntGameState.gameStarted = true;
            statusDisplay.textContent = 'Game in progress...';
            gameLoop();
        } else if (huntGameState.gameOver && !mpGameActive) {
            startHuntChaseGame();
        }
        return;
    }
    if (!huntGameState.gameStarted || huntGameState.gameOver) return;
    if (e.code === 'KeyW') hunter.keys.w = true;
    if (e.code === 'KeyS') hunter.keys.s = true;
    if (e.code === 'KeyA') hunter.keys.a = true;
    if (e.code === 'KeyD') hunter.keys.d = true;
    if (e.code === 'ArrowUp') prey.keys.up = true;
    if (e.code === 'ArrowDown') prey.keys.down = true;
    if (e.code === 'ArrowLeft') prey.keys.left = true;
    if (e.code === 'ArrowRight') prey.keys.right = true;
});

document.addEventListener('keyup', (e) => {
    if (!huntGameActive || !huntGameState) return;
    const { hunter, prey } = huntGameState;
    if (e.code === 'KeyW') hunter.keys.w = false;
    if (e.code === 'KeyS') hunter.keys.s = false;
    if (e.code === 'KeyA') hunter.keys.a = false;
    if (e.code === 'KeyD') hunter.keys.d = false;
    if (e.code === 'ArrowUp') prey.keys.up = false;
    if (e.code === 'ArrowDown') prey.keys.down = false;
    if (e.code === 'ArrowLeft') prey.keys.left = false;
    if (e.code === 'ArrowRight') prey.keys.right = false;
});

// Multiplayer Hunt & Chase
let ws;
const WS_SERVER = 'wss://rohan.hamaralabs.com';
let myId, myName, myRole, opponentId;
let mpGameActive = false;
let mpGameLoopId = null;
let mpRole = null;
let mpOpponentState = null;
let mpLocalState = null;
let mpHunterInLightTime = 0;
let mpHunterInLight = false;

function wsOnMessageHandler(event) {
    const msg = JSON.parse(event.data);
    if (msg.type === 'yourId') {
        myId = msg.id;
        myName = msg.name;
    }
    if (msg.type === 'playerList') {
        const list = msg.list.filter(p => p.id !== myId && p.status === 'online');
        const ul = document.getElementById('player-list');
        ul.innerHTML = '';
        list.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.name + ' ';
            const btn = document.createElement('button');
            btn.textContent = 'Invite';
            btn.onclick = () => ws.send(JSON.stringify({ type: 'invite', targetId: p.id }));
            li.appendChild(btn);
            ul.appendChild(li);
        });
    }
    
    function showInvite(fromName, fromId) {
        const modal = document.getElementById('multiplayer-modal');
        modal.style.display = 'block';
        const ul = document.getElementById('player-list');
        ul.innerHTML = '';
        const msg = document.createElement('div');
        msg.textContent = 'Received invite from: ' + fromName;
        msg.style.marginBottom = '16px';
        ul.appendChild(msg);
        const acceptBtn = document.createElement('button');
        acceptBtn.textContent = 'Accept';
        acceptBtn.onclick = function() {
            ws.send(JSON.stringify({ type: 'acceptInvite', from: fromId }));
            modal.style.display = 'none';
        };
        const declineBtn = document.createElement('button');
        declineBtn.textContent = 'Decline';
        declineBtn.onclick = function() {
            modal.style.display = 'none';
        };
        ul.appendChild(acceptBtn);
        ul.appendChild(declineBtn);
    }

    if (msg.type === 'invite') {
        showInvite(msg.name, msg.from);
    }
    if (msg.type === 'startGame') {
        myRole = msg.role;
        opponentId = msg.opponentId;
        document.getElementById('multiplayer-modal').style.display = 'none';
        mpRole = myRole;
        mpGameActive = true;
        mpOpponentState = null;
        mpLocalState = {
            x: mpRole === 'hunter' ? 100 : 700,
            y: mpRole === 'hunter' ? 100 : 500,
            keys: { up: false, down: false, left: false, right: false, w: false, a: false, s: false, d: false },
            role: mpRole,
            lastMove: mpRole === 'hunter' ? 'd' : 'left'
        };
        startMultiplayerHuntChase();
    }
    if (msg.type === 'gameUpdate') {
        mpOpponentState = msg.state;
    }
    if (msg.type === 'endGame') {
        // Debug log
        console.log('endGame', msg, 'myId:', myId, 'mpRole:', mpRole);
        // Stop the game loop and prevent any restart
        mpGameActive = false;
        if (mpGameLoopId) cancelAnimationFrame(mpGameLoopId);
        mpGameLoopId = null;
        // Remove any event listeners that could restart the game loop
        window.onkeydown = null;
        window.onkeyup = null;
        const canvas = document.getElementById('huntCanvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        // Defensive: if winner/loserId missing, infer from role
        let winner = msg.winner;
        let loserId = msg.loserId;
        if (!winner || !loserId) {
            if (mpRole === 'hunter') {
                winner = 'hunter';
                loserId = myId;
            } else {
                winner = 'prey';
                loserId = myId;
            }
        }
        // Show different messages for winner and loser
        let endMsg = '';
        if (winner === 'hunter') {
            if (mpRole === 'hunter') {
                endMsg = 'You caught the prey! You Win!';
            } else {
                endMsg = 'You were caught! You Lose!';
            }
        } else if (winner === 'prey') {
            if (mpRole === 'prey') {
                endMsg = 'You spotted the hunter! You Win!';
            } else {
                endMsg = 'You were spotted! You Lose!';
            }
        }
        ctx.fillText(endMsg, canvas.width/2, canvas.height/2);
        ctx.textAlign = 'left';
    }
}

let namePrompted = false;
let enteredName = '';
const multiplayerBtn = document.querySelector('.play-hunt-chase-multiplayer');
if (multiplayerBtn) {
    multiplayerBtn.onclick = function() {
        if (!namePrompted) {
            enteredName = prompt('Enter your name for multiplayer:');
            if (enteredName && enteredName.trim().length > 0) {
                namePrompted = true;
            } else {
                return;
            }
        }
        if (!ws) {
            ws = new WebSocket(WS_SERVER);
            ws.onmessage = wsOnMessageHandler;
            ws.onopen = function() {
                ws.send(JSON.stringify({ type: 'setName', name: enteredName.trim() }));
            };
        } else if (ws.readyState === 1) {
            ws.send(JSON.stringify({ type: 'setName', name: enteredName.trim() }));
        }
        document.getElementById('multiplayer-modal').style.display = 'block';
    };
}

function startMultiplayerHuntChase() {
    const canvas = document.getElementById('huntCanvas');
    const ctx = canvas.getContext('2d');
    document.getElementById('bubble-pop-container').style.display = 'none';
    document.getElementById('geometry-dash-container').style.display = 'none';
    document.getElementById('hunt-chase-container').style.display = 'block';

    const obstacles = [
        { x: 200, y: 150, w: 80, h: 20 },
        { x: 500, y: 300, w: 20, h: 80 },
        { x: 300, y: 450, w: 120, h: 20 },
        { x: 150, y: 250, w: 20, h: 100 },
        { x: 600, y: 100, w: 20, h: 60 }
    ];

    const size = 20;
    const speed = mpRole === 'hunter' ? 4.5 : 3.5;  // Hunter is faster

    function handleKey(e, isDown) {
        if (!mpGameActive) return;
        if (mpRole === 'hunter') {
            if (e.code === 'KeyW') mpLocalState.keys.w = isDown;
            if (e.code === 'KeyS') mpLocalState.keys.s = isDown;
            if (e.code === 'KeyA') mpLocalState.keys.a = isDown;
            if (e.code === 'KeyD') mpLocalState.keys.d = isDown;
        } else {
            if (e.code === 'ArrowUp') mpLocalState.keys.up = isDown;
            if (e.code === 'ArrowDown') mpLocalState.keys.down = isDown;
            if (e.code === 'ArrowLeft') mpLocalState.keys.left = isDown;
            if (e.code === 'ArrowRight') mpLocalState.keys.right = isDown;
        }
    }
    window.addEventListener('keydown', e => handleKey(e, true));
    window.addEventListener('keyup', e => handleKey(e, false));

    function checkCollisionRect(x, y, size, obstacle) {
        return (
            x + size/2 > obstacle.x &&
            x - size/2 < obstacle.x + obstacle.w &&
            y + size/2 > obstacle.y &&
            y - size/2 < obstacle.y + obstacle.h
        );
    }

    function drawTorchEffect(ctx, preyState) {
        // Create temporary canvas for torch effect
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 800;
        tempCanvas.height = 600;
        const tempCtx = tempCanvas.getContext('2d');
        // Draw background: hunter gets grey, prey gets black
        tempCtx.fillStyle = mpRole === 'hunter' ? '#333333' : 'black';
        tempCtx.fillRect(0, 0, 800, 600);
        
        // Draw torch effect
        tempCtx.save();
        tempCtx.globalCompositeOperation = 'destination-out';
        let angle = 0;
        if (preyState.lastMove) {
            switch (preyState.lastMove) {
                case 'up': angle = -Math.PI/2; break;
                case 'down': angle = Math.PI/2; break;
                case 'left': angle = Math.PI; break;
                case 'right': angle = 0; break;
                default: angle = 0;
            }
        }
        const torchLength = 180;
        const torchWidth = Math.PI/2;  // Wider torch angle
        tempCtx.beginPath();
        tempCtx.moveTo(preyState.x, preyState.y);
        tempCtx.arc(preyState.x, preyState.y, torchLength, angle - torchWidth/2, angle + torchWidth/2);
        tempCtx.lineTo(preyState.x, preyState.y);
        tempCtx.closePath();
        tempCtx.fill();
        tempCtx.restore();
        
        // Draw obstacles to block light
        tempCtx.fillStyle = 'black';
        obstacles.forEach(obs => {
            tempCtx.fillRect(obs.x, obs.y, obs.w, obs.h);
        });
        
        // Draw onto main canvas
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.restore();
    }

    function isHunterInTorch(prey, hunter) {
        if (!prey || !hunter) return false;
        
        let angle = 0;
        switch (prey.lastMove) {
            case 'up': angle = -Math.PI/2; break;
            case 'down': angle = Math.PI/2; break;
            case 'left': angle = Math.PI; break;
            case 'right': angle = 0; break;
            default: angle = 0;
        }
        const torchLength = 180;
        const torchWidth = Math.PI/2;  // Wider torch angle
        const dx = hunter.x - prey.x;
        const dy = hunter.y - prey.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > torchLength) return false;
        
        // Check line of sight for obstacles
        const steps = Math.max(10, dist/10);
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const checkX = prey.x + dx * t;
            const checkY = prey.y + dy * t;
            
            for (let obs of obstacles) {
                if (checkCollisionRect(checkX, checkY, 5, obs)) {
                    return false;
                }
            }
        }
        
        let hunterAngle = Math.atan2(dy, dx);
        let diff = ((hunterAngle - angle + Math.PI*3) % (Math.PI*2)) - Math.PI;
        return Math.abs(diff) < torchWidth/2;
    }

    function gameLoop() {
        if (!mpGameActive) return;
        // Set background: hunter gets grey, prey gets black
        ctx.fillStyle = mpRole === 'hunter' ? '#333333' : 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update local player position
        let newX = mpLocalState.x;
        let newY = mpLocalState.y;
        
        // Update last move direction
        if (mpRole === 'hunter') {
            if (mpLocalState.keys.w) { newY -= speed; mpLocalState.lastMove = 'w'; }
            if (mpLocalState.keys.s) { newY += speed; mpLocalState.lastMove = 's'; }
            if (mpLocalState.keys.a) { newX -= speed; mpLocalState.lastMove = 'a'; }
            if (mpLocalState.keys.d) { newX += speed; mpLocalState.lastMove = 'd'; }
        } else {
            if (mpLocalState.keys.up) { newY -= speed; mpLocalState.lastMove = 'up'; }
            if (mpLocalState.keys.down) { newY += speed; mpLocalState.lastMove = 'down'; }
            if (mpLocalState.keys.left) { newX -= speed; mpLocalState.lastMove = 'left'; }
            if (mpLocalState.keys.right) { newX += speed; mpLocalState.lastMove = 'right'; }
        }
        
        // Boundary checking
        if (newX - size/2 < 0) newX = size/2;
        if (newX + size/2 > canvas.width) newX = canvas.width - size/2;
        if (newY - size/2 < 0) newY = size/2;
        if (newY + size/2 > canvas.height) newY = canvas.height - size/2;
        
        // Wall collision checking
        let collided = false;
        for (let obs of obstacles) {
            if (checkCollisionRect(newX, mpLocalState.y, size, obs)) collided = true;
        }
        if (!collided) mpLocalState.x = newX;
        collided = false;
        for (let obs of obstacles) {
            if (checkCollisionRect(mpLocalState.x, newY, size, obs)) collided = true;
        }
        if (!collided) mpLocalState.y = newY;

        // Send updated state to opponent
        ws.send(JSON.stringify({ 
            type: 'gameUpdate', 
            state: { 
                x: mpLocalState.x, 
                y: mpLocalState.y, 
                role: mpRole, 
                lastMove: mpLocalState.lastMove 
            } 
        }));

        // 4. Only the prey sees the torch effect
        if (mpRole === 'prey') {
            drawTorchEffect(ctx, mpLocalState);
        }
        
        // Draw torch effect for both hunter and prey
        if (mpOpponentState) {
            // Find the prey's state (either local or opponent)
            let preyState = null;
            if (mpRole === 'prey') {
                preyState = mpLocalState;
            } else if (mpOpponentState.role === 'prey') {
                preyState = mpOpponentState;
            }
            if (preyState) {
                drawTorchEffect(ctx, preyState);
            }
        }
        
        // Draw obstacles (for both roles)
        ctx.fillStyle = '#95a5a6';
        obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.w, obs.h));

        // Draw local player
        ctx.fillStyle = mpRole === 'hunter' ? '#e74c3c' : '#3498db';
        ctx.fillRect(mpLocalState.x - size/2, mpLocalState.y - size/2, size, size);

        // 3. Prey cannot see hunter unless hunter is in torch
        if (mpOpponentState) {
            if (mpRole === 'prey' && mpOpponentState.role === 'hunter') {
                if (isHunterInTorch(mpLocalState, mpOpponentState)) {
                    ctx.fillStyle = '#e74c3c';
                    ctx.fillRect(mpOpponentState.x - size/2, mpOpponentState.y - size/2, size, size);
                }
            } else {
                ctx.fillStyle = mpOpponentState.role === 'hunter' ? '#e74c3c' : '#3498db';
                ctx.fillRect(mpOpponentState.x - size/2, mpOpponentState.y - size/2, size, size);
            }
        }

        // 5. After 1s of hunter in torch, end game with correct messages
        if (mpRole === 'prey' && mpOpponentState && mpOpponentState.role === 'hunter') {
            const hunterInTorch = isHunterInTorch(mpLocalState, mpOpponentState);
            if (hunterInTorch) {
                if (!mpHunterInLight) {
                    mpHunterInLight = true;
                    mpHunterInLightTime = 0;
                } else {
                    mpHunterInLightTime += 0.016;
                    if (mpHunterInLightTime >= 1) {
                        mpGameActive = false;
                        ws.send(JSON.stringify({ 
                            type: 'endGame',
                            winner: 'prey',
                            loserId: myId // prey sends their own id as loser
                        }));
                        return;
                    }
                }
                ctx.fillStyle = '#fff';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`Hunter spotted! ${(1 - mpHunterInLightTime).toFixed(1)}s`, canvas.width/2, 30);
                ctx.textAlign = 'left';
            } else {
                mpHunterInLight = false;
                mpHunterInLightTime = 0;
            }
        }
        // Hunter win by catching prey
        if (mpOpponentState) {
            const dx = mpLocalState.x - mpOpponentState.x;
            const dy = mpLocalState.y - mpOpponentState.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < size) {
                mpGameActive = false;
                ws.send(JSON.stringify({ 
                    type: 'endGame',
                    winner: mpRole === 'hunter' ? 'hunter' : 'prey',
                    loserId: myId // always send your own id as loser
                }));
                return;
            }
        }
        mpGameLoopId = requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// Prevent scrolling when playing Hunt & Chase (multiplayer or single player)
window.addEventListener('keydown', function(e) {
    if (
        (huntGameActive || mpGameActive) &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Space"].includes(e.key)
    ) {
        e.preventDefault();
        return false;
    }
}, { passive: false });