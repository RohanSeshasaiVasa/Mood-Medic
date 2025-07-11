// First mood
document.getElementById('mood').addEventListener('change', function() {
    const div1 = document.getElementById('div1');
    if (this.value === 'happy') {
        div1.style.display = "block";
    } else {
        div1.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const mood = document.getElementById('mood');
    const div1 = document.getElementById('div1');
    if (mood.value !== 'happy') {
        div1.style.display = 'none';
    }
});

// Second mood
document.getElementById('mood').addEventListener('change', function() {
    const div2 = document.getElementById('div2');
    if (this.value === 'angry') {
        div2.style.display = "block";
    } else {
        div2.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const mood = document.getElementById('mood');
    const div2 = document.getElementById('div2');
    if (mood.value !== 'angry') {
        div2.style.display = 'none';
    }
});

// Third mood
document.getElementById('mood').addEventListener('change', function() {
    const div3 = document.getElementById('div3');
    if (this.value === 'sad') {
        div3.style.display = "block";
    } else {
        div3.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const mood = document.getElementById('mood');
    const div3 = document.getElementById('div3');
    if (mood.value !== 'sad') {
        div3.style.display = 'none';
    }
});

// Fourth mood
document.getElementById('mood').addEventListener('change', function() {
    const div4 = document.getElementById('div4');
    if (this.value === 'anxious') {
        div4.style.display = "block";
    } else {
        div4.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const mood = document.getElementById('mood');
    const div4 = document.getElementById('div4');
    if (mood.value !== 'anxious') {
        div4.style.display = 'none';
    }
});

// Fifth mood
document.getElementById('mood').addEventListener('change', function() {
    const div5 = document.getElementById('div5');
    if (this.value === 'dizzy') {
        div5.style.display = "block";
    } else {
        div5.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const mood = document.getElementById('mood');
    const div5 = document.getElementById('div5');
    if (mood.value !== 'dizzy') {
        div5.style.display = 'none';
    }
});

// Sixth mood
document.getElementById('mood').addEventListener('change', function() {
    const div6 = document.getElementById('div6');
    if (this.value === 'loneliness') {
        div6.style.display = "block";
    } else {
        div6.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const mood = document.getElementById('mood');
    const div6 = document.getElementById('div6');
    if (mood.value !== 'loneliness') {
        div6.style.display = 'none';
    }
});

// Floating emoji
const emojis = ["😊", "😡", "😢", "😱", "😵", "🥰"]
const container = document.getElementById('emoji-float-container');

function createFloatingEmoji() {
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



// Themed selection
document.addEventListener('DOMContentLoaded', function() {
    const moodSelect = document.getElementById('mood');
    const body = document.body;

    moodSelect.addEventListener('change', function() {
        body.classList.remove('happy', 'angry', 'sad', 'anxious', 'dizzy', 'loneliness');
        if (this.value !== '--') {
            body.classList.add(this.value);
        }
    });
});

//Bubble pop game
const canvas = document.getElementById('bubbleCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        let score = 0;

        function randomColor() {
            const colors = ['#aee9f7', '#f7d6e0', '#f7f1a3', '#b2f7c6', '#e0c3fc', '#f7cac9'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        class Bubble {
            constructor() {
                this.radius = Math.random() * 25 + 20;
                this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
                this.y = canvas.height + this.radius + Math.random() * 100;
                this.speed = Math.random() * 1.5 + 0.7;
                this.color = randomColor();
                this.popped = false;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }
            update() {
                this.y -= this.speed;
            }
            isClicked(mx, my) {
                return Math.sqrt((this.x - mx) ** 2 + (this.y - my) ** 2) < this.radius;
            }
        }

        let bubbles = [];
        function addBubble() {
            if (bubbles.length < 12) {
                bubbles.push(new Bubble());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bubbles.forEach((bubble, i) => {
                bubble.update();
                bubble.draw();
                if (bubble.y + bubble.radius < 0) {
                    // Remove bubbles that float off screen
                    bubbles.splice(i, 1);
                }
            });
            requestAnimationFrame(animate);
        }

        canvas.addEventListener('click', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            for (let i = bubbles.length - 1; i >= 0; i--) {
                if (bubbles[i].isClicked(mx, my)) {
                    bubbles.splice(i, 1);
                    score++;
                    scoreDisplay.textContent = 'Score: ' + score;
                    break;
                }
            }
        });

        // Add bubbles at intervals
        setInterval(addBubble, 900);
        animate();