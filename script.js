const steps = [
  { image: 'oriana1.jpeg', text: 'HOOOOO' },
  { image: 'oriana2.png', text: 'saias ke a mi tio' },
  { image: 'oriana3.png', text: 'le gutas mucho' },
  { image: 'oriana4.png', text: 'jejejeje' },
  { image: 'oriana5.png', text: 'chaoooo' },
];

const incomingScreen = document.querySelector('#incoming-screen');
const callScreen = document.querySelector('#call-screen');
const endedScreen = document.querySelector('#ended-screen');
const answerButton = document.querySelector('#answer-call');
const declineButton = document.querySelector('#decline-call');
const endButton = document.querySelector('#end-call');
const replayButton = document.querySelector('#replay-call');
const nextButton = document.querySelector('#next-step');
const photo = document.querySelector('#oriana-photo');
const messageText = document.querySelector('#message-text');
const stepCount = document.querySelector('#step-count');
const progressLabel = document.querySelector('#progress-label');
const progressBar = document.querySelector('#progress-bar');
const messageBubble = document.querySelector('#message-bubble');
const callTime = document.querySelector('#call-time');
const floatingHearts = document.querySelector('#floating-hearts');
const heartConfetti = document.querySelector('#heart-confetti');
const secretMessage = document.querySelector('#secret-message');
const secretReplies = document.querySelector('#secret-replies');

let currentStep = 0;
let callTimer;
let callStartedAt;

const heartSymbols = ['♡', '♥', '💕', '💗', '✦'];
const secretMessages = ['teamo<3', 'muak', '💗', '💋', '♡', 'teamo<3', '💕', '😘', '💞', 'muak'];

function setScreen(activeScreen) {
  [incomingScreen, callScreen, endedScreen].forEach((screen) => {
    screen.classList.toggle('is-hidden', screen !== activeScreen);
  });
}

function showStep(index) {
  currentStep = index;
  const step = steps[currentStep];

  photo.classList.add('is-changing');
  messageBubble.style.animation = 'none';

  window.setTimeout(() => {
    photo.src = step.image;
    photo.alt = `Oriiii diciendo: ${step.text}`;
    messageText.textContent = step.text;
    stepCount.textContent = `${String(currentStep + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
    progressLabel.textContent = `${currentStep + 1} de ${steps.length}`;
    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    photo.classList.remove('is-changing');
    void messageBubble.offsetWidth;
    messageBubble.style.animation = '';
  }, 120);
}

function updateCallTime() {
  const elapsedSeconds = Math.floor((Date.now() - callStartedAt) / 1000);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
  const seconds = String(elapsedSeconds % 60).padStart(2, '0');
  callTime.textContent = `${minutes}:${seconds}`;
}

function spawnFloatingHearts() {
  const hearts = Array.from({ length: 7 }, (_, index) => {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[index % heartSymbols.length];
    heart.style.setProperty('--left', `${15 + Math.random() * 70}%`);
    heart.style.setProperty('--heart-size', `${13 + Math.random() * 13}px`);
    heart.style.setProperty('--heart-color', index % 2 ? '#f08aaa' : '#f9c6d5');
    heart.style.setProperty('--delay', `${Math.random() * 0.18}s`);
    heart.style.setProperty('--drift', `${-35 + Math.random() * 70}px`);
    floatingHearts.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1900);
    return heart;
  });
  return hearts;
}

function burstFinalHearts() {
  heartConfetti.innerHTML = '';
  for (let index = 0; index < 28; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'confetti-heart';
    heart.textContent = heartSymbols[index % heartSymbols.length];
    heart.style.setProperty('--left', `${2 + Math.random() * 96}%`);
    heart.style.setProperty('--heart-size', `${11 + Math.random() * 16}px`);
    heart.style.setProperty('--heart-color', index % 3 === 0 ? '#d95780' : index % 3 === 1 ? '#f2a0b8' : '#caa8d7');
    heart.style.setProperty('--delay', `${Math.random() * 0.8}s`);
    heart.style.setProperty('--duration', `${3.4 + Math.random() * 1.5}s`);
    heart.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    heart.style.setProperty('--rotation', `${-40 + Math.random() * 80}deg`);
    heartConfetti.appendChild(heart);
  }
}

function showSecretMessages() {
  secretReplies.innerHTML = '';
  secretMessages.forEach((message, index) => {
    const reply = document.createElement('span');
    reply.className = 'secret-reply';
    reply.textContent = message;
    reply.style.animationDelay = `${index * 70}ms`;
    secretReplies.appendChild(reply);
  });
  secretReplies.classList.remove('is-hidden');
  secretMessage.innerHTML = '<span aria-hidden="true">♥</span> te extraño muchísimo';
  spawnFloatingHearts();
}

function startCall() {
  currentStep = 0;
  floatingHearts.innerHTML = '';
  heartConfetti.innerHTML = '';
  setScreen(callScreen);
  callStartedAt = Date.now();
  updateCallTime();
  window.clearInterval(callTimer);
  callTimer = window.setInterval(updateCallTime, 1000);
  showStep(0);
}

function finishCall() {
  window.clearInterval(callTimer);
  setScreen(endedScreen);
  burstFinalHearts();
}

function restartCall() {
  window.clearInterval(callTimer);
  floatingHearts.innerHTML = '';
  heartConfetti.innerHTML = '';
  secretReplies.innerHTML = '';
  secretReplies.classList.add('is-hidden');
  secretMessage.innerHTML = '<span aria-hidden="true">♡</span> te extraño';
  setScreen(incomingScreen);
}

answerButton.addEventListener('click', startCall);
declineButton.addEventListener('click', finishCall);
endButton.addEventListener('click', finishCall);
replayButton.addEventListener('click', restartCall);

nextButton.addEventListener('click', () => {
  spawnFloatingHearts();
  if (currentStep >= steps.length - 1) {
    finishCall();
    return;
  }
  showStep(currentStep + 1);
});

secretMessage.addEventListener('click', showSecretMessages);
