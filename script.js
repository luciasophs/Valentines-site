const gifts = [
    "🤗 You’ve won a hug!",
    "💋 You’ve won a kiss!",
    "💆 You’ve won a massage!",
    "🍫 You’ve won chocolate!",
    "🕯️ You’ve won a cosy night!",
    "🛌 You’ve won a nap together!"
];

function spinWheel() {
    const wheel = document.getElementById("wheel");
    const result = document.getElementById("result");
    const spinAgain = document.getElementById("spinAgain");

    // Pick a random gift
    const choiceIndex = Math.floor(Math.random() * gifts.length);
    const choice = gifts[choiceIndex];

    // Calculate random rotation so it "lands" on the chosen gift
    const slices = gifts.length;
    const sliceDeg = 360 / slices;
    const randomSpin = 5 * 360 + choiceIndex * sliceDeg + Math.floor(Math.random() * sliceDeg);

    // Reset animation to allow first spin
    wheel.style.transition = "none";
    wheel.style.transform = "rotate(0deg)";

    // Force reflow
    void wheel.offsetWidth;

    // Start spinning
    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = `rotate(${randomSpin}deg)`;

    // After spinning ends
    setTimeout(() => {
        result.innerText = `You got: ${choice}! 💝`;

        // Confetti effect
        for (let i = 0; i < 30; i++) createConfetti();

        // Show spin again button
        spinAgain.style.display = "inline-block";

        // Send email notification
        sendEmail(choice);

    }, 3000); // match transition duration
}

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
}

// Countdown
const valentines = new Date("Feb 14, 2026 00:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = valentines - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const el = document.getElementById("countdown");
    if (el) el.innerText = `⏳ ${days} days until Valentine’s Day 💕`;
}, 1000);

// EmailJS
(function () {
    emailjs.init("zxnnB59nY3nGfcGs5");
})();

function sendEmail(gift) {
    emailjs.send("service_n425r2c", "template_avhnizs", {
        gift_choice: gift
    }).then(() => {
        alert("💌 I’ve been notified!");
    });
}
