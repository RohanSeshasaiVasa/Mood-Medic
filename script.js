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