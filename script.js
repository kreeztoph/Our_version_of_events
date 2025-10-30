// --- 1. QUIZ DATA (20 Questions Total) ---
const quizQuestions = [
    // --- STAGE 1: INPUT QUESTIONS (10 Questions - Must be correct) ---
    { type: "input", question: "Where did we go on our first ever vacation together?", image: "vacation1.jpg", correctAnswer: "Sheffield" },
    { type: "input", question: "What is my middle name? (Full name needed)", image: "middle_name.jpg", correctAnswer: "Ayomi" },
    { type: "input", question: "What country did we first travel together?", image: "country.jpg", correctAnswer: "Italy" },
    { type: "input", question: "Where do we spend our new year (When not at home)?", image: "london bridge.jpg", correctAnswer: "London Bridge" },
    { type: "input", question: "What year did we officially become a couple?", image: "yes.jpg", correctAnswer: "2023" },
    { type: "input", question: "First gift you ever got me? (Brand Name)", image: "perfume.jpg", correctAnswer: "Tom Ford" },
    { type: "input", question: "My favourite color?", image: "color.jpg", correctAnswer: "Blue" },
    { type: "input", question: "Your favourite genre of movie? (Remember the -)", image: "movies.jpg", correctAnswer: "K-drama" },
    { type: "input", question: "A sport you hate and I love?", image: "sport.jpg", correctAnswer: "Running" },
    { type: "input", question: "Our comfort meal but you prefer i make it?", image: "noodles.jpg", correctAnswer: "Noodles" },

    // --- STAGE 2: MULTIPLE CHOICE QUESTIONS (10 Questions - Scored) ---
    { type: "multiple-choice", question: "Where did we first meet?", image: "meet.jpg", options: ["Tesco", "Amazon", "Asda", "Sainsbury"], correctAnswer: "Amazon" },
    { type: "multiple-choice", question: "What is my most annoying habit (that you secretly find cute?", image: "habit.jpg", options: ["Leaving socks everywhere", "Overthinking everything", "Falling asleep mid-movie", "Talking too much about random facts"], correctAnswer: "Falling asleep mid-movie" },
    { type: "multiple-choice", question: "If we could travel anywhere right now, where would we go?", image: "plane.jpg", options: ["Greece", "Japan", "France", "Somewhere with zero responsibilities"], correctAnswer: "Somewhere with zero responsibilities" },
    { type: "multiple-choice", question: "What color do I wear most?", image: "cloth.jpg", options: ["Black", "Blue", "Grey", "White"], correctAnswer: "Blue" },
    { type: "multiple-choice", question: "What is the biggest relationship milestone we've hit?", image: "milestone.jpg", options: ["Moving In", "Getting a Pet", "Big Trip", "Surviving DIY"], correctAnswer: "Moving In" },
    { type: "multiple-choice", question: "What's the best time for our movie dates?", image: "movie_date.jpg", options: ["Early Morning", "Noon", "Late Night", "Midnight"], correctAnswer: "Late Night" },
    { type: "multiple-choice", question: "Who takes longer to get ready?", image: "ready.jpg", options: ["Boop", "Boopsie", "Us", "Depens on the day and event!"], correctAnswer: "Boopsie" },
    { type: "multiple-choice", question: "What is one thing that you do that always makes me smile?", image: "smile.jpg", options: ["Random texts during the day", "The way you look at me", "Your smile", "All of the above😍"], correctAnswer: "All of the above😍" },
    { type: "multiple-choice", question: "What is something only we understand?", image: "secret.jpg", options: ["Our code words", "Our look that means let's go", "Our body movements", "All of the above"], correctAnswer: "All of the above" },
    { type: "multiple-choice", question: "What was the real reason I fell for you?", image: "final.jpg", options: ["Your smile", "Your kindness", "Everything that makes you", "Your bum bum"], correctAnswer: "Everything that makes you" }
];

// --- 2. EXCLUSIVE LOGIN DATA ---
const SECRET_PROFILE = {
    firstName: "Jemimah",
    lastName: "Obikile",
    nickname: "Boopsie",
    dob: "1997-06-06", // YYYY-MM-DD format
    phone: "07771292869", // Example: full number (will check last 4 digits)
    weight: "94", // Example: kg
    favNumber: "6",
};

// --- 3. ELEMENTS & STATE ---
let currentQuestionIndex = 0;
let score = 0; 
let timeLeft = 60 * 60; // 10 minutes
let timerInterval;
let animationFrameId; // For continuous celebrations

const introScreen = document.getElementById('intro-screen');
const appContainer = document.getElementById('app-container');
const introVideo = document.getElementById('intro-video'); // New video element
const welcomeMessage = document.getElementById('welcome-message');
const startButton = document.getElementById('start-button');
const contentArea = document.getElementById('content-area');
const progressBarFill = document.getElementById('progress-bar-fill');
const timerDisplay = document.getElementById('timer');
const music = document.getElementById('background-music');
const cheerSound = document.getElementById('cheer-sound');
const confettiCanvas = document.getElementById('confetti-canvas');
const finalSpinnerOverlay = document.getElementById('final-spinner-overlay'); // New spinner element

const STAGE_1_COUNT = 10;
const STAGE_2_COUNT = 10;
const TOTAL_QUIZ_QUESTIONS = STAGE_1_COUNT + STAGE_2_COUNT; 


// --- 4. VIDEO INTRO & START SEQUENCE ---

function setupIntro() {
    introScreen.classList.add('active'); 
    
    introVideo.play().then(() => {
        introVideo.classList.add('revealed'); 
    }).catch(error => {
        console.warn("Video autoplay prevented:", error);
        introVideo.classList.add('revealed');
    });

    setTimeout(() => {
        welcomeMessage.classList.remove('hidden');
        welcomeMessage.classList.add('revealed');
    }, 2000); 

    setTimeout(() => {
        startButton.classList.remove('hidden'); 
        startButton.classList.add('revealed'); 
        startButton.addEventListener('click', startLoginSequence); 
    }, 4000); 
}

window.onload = () => {
    setupIntro();
};

function startLoginSequence() {
    introScreen.classList.remove('active');
    introScreen.classList.add('hidden');
    appContainer.classList.remove('hidden');
    appContainer.classList.add('active');
    
    introVideo.pause();
    introVideo.currentTime = 0; 
    
    // CRITICAL FIX: Start the background music here!
    music.volume = 0.3;
    music.play().catch(e => console.warn("Background music autoplay failed.")); 
    
    document.getElementById('header').style.display = 'none'; 
    setupLoginScreen();
}

// --- 5. LOGIN GATE ---

function setupLoginScreen() {
    contentArea.innerHTML = `
        <h2 id="login-screen-title">💖 The Love Lock: Only You Hold the Key 🔐</h2>
        <p id="login-screen-subtitle">To unlock our shared memories and celebrate our journey, please verify your exclusive credentials. Just for you, my love!</p>
        <div id="login-form">
            <label for="fname">First Name:</label><input type="text" id="fname" required>
            <label for="nname">Nickname:</label><input type="text" id="nname" required>
            <label for="dob">Date of Birth (YYYY-MM-DD):</label><input type="date" id="dob" required>
            <label for="phone">Phone (Last 4 digits):</label><input type="text" id="phone" required maxlength="4">
            <label for="weight">Weight (kg, e.g., 94):</label><input type="text" id="weight" required>
            <label for="favNum">Favourite Number:</label><input type="text" id="favNum" required>
            <p id="login-error" class="error-message"></p>
        </div>
        <button id="submit-login" class="answer-btn" onclick="checkLogin()">UNLOCK OUR ANNIVERSARY ✨</button>
    `;
    document.getElementById('login-error').style.color = 'var(--error-color)';
}

function checkLogin() {
    const errorDisplay = document.getElementById('login-error');
    const inputFname = document.getElementById('fname').value.trim().toLowerCase();
    const inputNname = document.getElementById('nname').value.trim().toLowerCase();
    const inputDob = document.getElementById('dob').value.trim();
    const inputPhone = document.getElementById('phone').value.trim();
    const inputWeight = document.getElementById('weight').value.trim();
    const inputFavNum = document.getElementById('favNum').value.trim();

    let passed = true;
    
    if (inputFname !== SECRET_PROFILE.firstName.toLowerCase()) { passed = false; errorDisplay.textContent = "First Name is incorrect. Try again, love!"; } 
    else if (inputNname !== SECRET_PROFILE.nickname.toLowerCase()) { passed = false; errorDisplay.textContent = "Nickname doesn't match the one only I know 😉"; } 
    else if (inputDob !== SECRET_PROFILE.dob) { passed = false; errorDisplay.textContent = "Date of Birth is locked in my heart. You missed it!"; } 
    else if (!SECRET_PROFILE.phone.endsWith(inputPhone) || inputPhone.length !== 4) { passed = false; errorDisplay.textContent = "Phone number (last 4) is wrong. Who are you calling?!"; } 
    else if (inputWeight !== SECRET_PROFILE.weight) { passed = false; errorDisplay.textContent = "Weight is slightly off! Maybe you put it in grams? 😉"; } 
    else if (inputFavNum !== SECRET_PROFILE.favNumber) { passed = false; errorDisplay.textContent = "That's not your favorite number. Think harder!"; }

    if (passed) {
        errorDisplay.textContent = "ACCESS GRANTED! Welcome, my darling. Only you could know that!";
        errorDisplay.style.color = 'var(--success-color)';
        
        document.getElementById('header').style.display = 'flex'; 
        setTimeout(startAnniversaryQuiz, 5500);
    } 
}

function startAnniversaryQuiz() {
    music.volume = 0.3;
    music.play().catch(e => console.log("Music play blocked."));
    document.getElementById('progress-bar-container').style.display = 'block';
    startQuiz();
}

// --- 6. QUIZ FLOW ---

function startQuiz() {
    startTimer();
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= TOTAL_QUIZ_QUESTIONS) {
        clearInterval(timerInterval);
        showFinalPage(); 
        return;
    }

    const qData = quizQuestions[currentQuestionIndex];
    
    const progressPercentage = (currentQuestionIndex / TOTAL_QUIZ_QUESTIONS) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
    
    const questionNumber = currentQuestionIndex + 1;
    let stageTitle = currentQuestionIndex < STAGE_1_COUNT ? "Stage 1: The Gatekeeper (Input)" : "Stage 2: The Fun Part (Multi-Choice)";

    if (qData.type === "input") {
        contentArea.innerHTML = `
            <h2>${stageTitle} (Question ${questionNumber} of ${TOTAL_QUIZ_QUESTIONS})</h2>
            <img src="${qData.image}" class="question-image" alt="Question related image/gif">
            <p class="question-text">${qData.question}</p>
            <input type="text" id="answer-input" placeholder="Type your answer here">
            <button id="submit-answer" class="answer-btn" onclick="checkInputAnswer()">Submit</button>
            <div class="error-message" id="error-msg"></div>
        `;
    } else {
        // FIXED: Added a dedicated error message div for multiple choice
        contentArea.innerHTML = `
            <h2>${stageTitle} (Question ${questionNumber} of ${TOTAL_QUIZ_QUESTIONS})</h2>
            <img src="${qData.image}" class="question-image" alt="Question related image/gif">
            <p class="question-text">${qData.question}</p>
            <div id="options-container">
                ${qData.options.map(option => `
                    <button class="answer-btn" onclick="checkMCAnswer('${option}')">${option}</button>
                `).join('')}
            </div>
            <div class="error-message" id="mc-error-msg"></div>
        `;
    }

    const img = contentArea.querySelector('.question-image');
    img.onerror = function() {
        img.style.lineHeight = '150px';
        img.textContent = `Image/GIF for "${qData.image}"`;
    };
}

function checkInputAnswer() {
    const qData = quizQuestions[currentQuestionIndex];
    const input = document.getElementById('answer-input').value.trim().toLowerCase();
    const correct = qData.correctAnswer.toLowerCase();
    const errorMsg = document.getElementById('error-msg');

    if (input === correct) {
        playCheerSound();
        triggerRandomCelebration();
        
        errorMsg.textContent = "Correct! Proceeding to the next challenge...";
        errorMsg.style.color = "green";
        
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    } else {
        errorMsg.textContent = "Oops! That's not right. Try again!";
        errorMsg.style.color = 'var(--error-color)';
    }
}

// FIXED: This function now only progresses on a correct answer.
function checkMCAnswer(selectedOption) {
    const qData = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === qData.correctAnswer;
    const errorMsg = document.getElementById('mc-error-msg'); // Get the new error element

    if (isCorrect) {
        if (currentQuestionIndex >= STAGE_1_COUNT) {
            score++;
        }
        playCheerSound();
        triggerRandomCelebration();
        
        // Correct Answer: Advance to next question
        currentQuestionIndex++; 
        loadQuestion();
    } else {
        // Incorrect Answer: Show error and DO NOT advance
        errorMsg.textContent = "That wasn't it! This is important to me, try again! 😉";
        errorMsg.style.color = 'var(--error-color)';
    }
}


// --- 7. FINAL PAGE & RUNAWAY BUTTON ---

function showFinalPage() { 
    progressBarFill.style.width = '100%'; 
    const mcCount = STAGE_2_COUNT;
    
    contentArea.innerHTML = `
        <h1>🥳 WE MADE IT TO 3 YEARS! 🥂</h1>
        <p style="font-size: 1.2em;">You successfully passed 10 memory challenges AND 10 knowledge questions!</p>
        <p style="font-size: 1.5em; color: var(--primary-color);">
        <h1>✨ A World's Wonder: Our Three Years</h1>
        <p>Out of an incredible <b>8 Billion souls</b>, scattered across <b>7 Continents</b> and <b>195 Countries</b> I found you. The chances are astronomical, but our love is absolute.</p>

        <p>Our shared history is not measured by geography, but by the precious moments we have woven together:</p>

        <ul>
            <li<b>3 Years</b> of building a future.</li>
            <li<b>36 Months</b> that turned a beginning into an eternity.</li>
            <li<b>1,096 Days</b> where you were my reason to wake up.</li>
            <li<b>26,304 Hours</b> of laughter, comfort, and shared silence.</li>
            <li<b>1,578,240 Minutes</b> where our hearts beat side-by-side.</li>
            <li>A breathtaking <b>94,694,400 Seconds</b> of pure love.</li>
        </ul>

        <p>In all the vastness of the world, there is only one moment that matters: the one where I look at you. Every second, every minute, every year has been a gift, and I will cherish every one that follows.</p>

        <p>I love you <b>Jemimah Dumebi Adure Obikile</b></p>

        <div id="final-message-container" style="min-height: 24px; margin-bottom: 5px;"></div> 

        <div style="margin-top: 40px;">
            <p style="font-size: 1.8em;"><b>Will you stay with me forever?</b></p>
        </div>

        <div id="no-button-container">
            <button class="answer-btn" id="yes-button" onclick="handleYes()">YES!</button>
            <button class="answer-btn" id="no-button" onclick="handleNo()">No 🥲</button>
        </div>
    `;

    setupRunawayButton();
    startConfettiAnimation(50, true, 'heart'); 
}

function handleYes() {
    // 1. Show the final success spinner/modal
    finalSpinnerOverlay.classList.remove('hidden');
    
    // 2. Change the spinner text after 2 seconds
    setTimeout(() => {
        document.getElementById('spinner-text').textContent = "CONGRATULATIONS! You can now open your gift. ❤️";
        
        // 3. Remove the spinner effect 
        document.querySelector('.spinner').style.display = 'none';

    }, 2000); // 2-second delay for "Processing"

    // 4. Close the window after 5 seconds total
    setTimeout(() => {
        // Attempt to close the window (Note: modern browsers often block this unless the window was opened by script)
        window.close();
        
        // Fallback alert for browsers that block window.close()
        alert("The app is complete! You can now open your gift, my love. (Please close this tab manually if it did not close automatically.)");
    }, 5000); // 5-second total delay (2s processing + 3s display)
}

function handleNo() {
    const messageContainer = document.getElementById('final-message-container');
    
    // Display the "oops" message
    messageContainer.innerHTML = `<p style="color: var(--error-color); font-weight: 600; animation: fadeOut 3s forwards;">Oops, you are not allowed to say that word! 😉</p>`;
    
    // Remove the message after a delay
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 3000);

    // Re-enable the running logic on hover/touch if it somehow stopped
    setupRunawayButton(); 
}

function setupRunawayButton() { 
    const noButton = document.getElementById('no-button');
    const container = document.getElementById('no-button-container');

    function moveButton() {
        noButton.classList.add('running'); 
        
        const maxX = container.offsetWidth - noButton.offsetWidth;
        const maxY = container.offsetHeight - noButton.offsetHeight;

        const newX = Math.random() * maxX * 0.8 + (container.offsetWidth * 0.1); 
        const newY = Math.random() * maxY; 

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    // Ensure listeners are only added once
    if (!noButton.dataset.listenersAdded) {
        noButton.addEventListener('mouseover', moveButton);
        noButton.addEventListener('touchstart', moveButton);
        noButton.dataset.listenersAdded = 'true';
    }
}

// --- 9. TIMER, SOUND, & ANIMATION UTILITIES ---

function startTimer() { 
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Showing the final page now...");
            showFinalPage(); 
        }
    }, 1000);
}

function triggerRandomCelebration() { 
    const effects = ['heart', 'confetti', 'balloon', 'smile'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    runQuestionEffect(randomEffect, 800); 
}

function playCheerSound() { 
    if (cheerSound) {
        cheerSound.currentTime = 0; 
        cheerSound.play().catch(e => console.log("Sound effect play blocked by browser."));
    }
}

function runQuestionEffect(particleType, durationMs) { 
    startConfettiAnimation(30, false, particleType); 
    setTimeout(() => {
        const ctx = confettiCanvas.getContext('2d');
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, durationMs);
}

function startConfettiAnimation(numParticles = 30, continuous = false, particleType = 'confetti') { 
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    let particles = [];
    const colors = ['#ff4d99', '#ffb3c7', '#ff69b4', '#ffe6f0', '#00bfff', '#ffc107', '#4dd0e1'];

    class Particle {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = confettiCanvas.height + Math.random() * 100;
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 3 + 1; 
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.type = particleType;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            if (this.type === 'heart') {
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x + this.size * 1.5, this.y - this.size * 2, this.x + this.size * 2, this.y, this.x, this.y + this.size * 2);
                ctx.bezierCurveTo(this.x - this.size * 2, this.y, this.x - this.size * 1.5, this.y - this.size * 2, this.x, this.y);
            } else if (this.type === 'balloon') {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.moveTo(this.x, this.y + this.size);
                ctx.lineTo(this.x, this.y + this.size + 15);
                ctx.stroke();
                ctx.beginPath(); 
            } else if (this.type === 'confetti') {
                ctx.fillRect(this.x, this.y, this.size, this.size / 2);
            } else if (this.type === 'smile') {
                ctx.fillStyle = '#ffeb3b';
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.font = `${this.size}px Arial`;
                ctx.fillText('😊', this.x - this.size / 2, this.y + this.size / 3);
            }
            ctx.fill();
        }

        update() {
            this.y -= this.speed;
            if (this.y < -this.size && continuous) {
                this.y = confettiCanvas.height + this.size;
                this.x = Math.random() * confettiCanvas.width;
            }
        }
    }

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); 
        
        let allDead = true;
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
            if (particle.y > -particle.size) {
                allDead = false;
            }
        });
        
        if (continuous || !allDead) {
            animationFrameId = requestAnimationFrame(animate); 
        } else {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }

    animate();
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
}