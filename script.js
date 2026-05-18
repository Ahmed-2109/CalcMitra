const expressionInput =
document.getElementById('expression');

const resultEl =
document.getElementById('result');

const buttons =
document.querySelectorAll('.btn');

const historyList =
document.getElementById('historyList');

const clearHistory =
document.getElementById('clearHistory');

const copyBtn =
document.getElementById('copyBtn');

const themeSelector =
document.getElementById('themeSelector');

let expression = '';

/* =========================
   BUTTON EVENTS
========================= */

buttons.forEach(button => {

  button.addEventListener('click', () => {

    const value = button.textContent;

    if(value === 'C') {

      clearAll();
      return;

    }

    if(value === '=') {

      calculate();
      return;

    }

    expression += value;

    expressionInput.value = expression;

  });

});

/* =========================
   CALCULATE
========================= */

function calculate() {

  try {

    const result = eval(expression);

    resultEl.textContent = result;

    addHistory(expression, result);

    expression = result.toString();

    expressionInput.value = expression;

    animateResult();

  }

  catch {

    resultEl.textContent = 'Error';

  }

}

/* =========================
   CLEAR
========================= */

function clearAll() {

  expression = '';

  expressionInput.value = '';

  resultEl.textContent = '0';

}

/* =========================
   HISTORY
========================= */

function addHistory(exp, result) {

  const li = document.createElement('li');

  li.innerHTML = `
    <span>${exp}</span>
    <strong>= ${result}</strong>
  `;

  historyList.prepend(li);

}

/* =========================
   CLEAR HISTORY
========================= */

clearHistory.addEventListener('click', () => {

  historyList.innerHTML = '';

});

/* =========================
   COPY ANSWER
========================= */

copyBtn.addEventListener('click', () => {

  navigator.clipboard.writeText(
    resultEl.textContent
  );

  copyBtn.textContent = '✅';

  setTimeout(() => {

    copyBtn.textContent = '📋';

  },1500);

});

/* =========================
   THEME CHANGE
========================= */

themeSelector.addEventListener('change', () => {

  document.body.className =
  themeSelector.value;

});

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener('keydown', (e) => {

  const key = e.key;

  if('0123456789+-*/.'.includes(key)) {

    expression += key;

    expressionInput.value = expression;

  }

  if(key === 'Enter') {

    calculate();

  }

  if(key === 'Backspace') {

    expression =
    expression.slice(0,-1);

    expressionInput.value =
    expression;

  }

  if(key === 'Escape') {

    clearAll();

  }

});

/* =========================
   RESULT ANIMATION
========================= */

function animateResult() {

  resultEl.animate([

    {
      transform: 'scale(1)'
    },

    {
      transform: 'scale(1.2)'
    },

    {
      transform: 'scale(1)'
    }

  ], {

    duration: 400

  });

}

/* =========================
   PARTICLE EFFECT
========================= */

function createParticles() {

  const particle =
  document.createElement('span');

  particle.style.position = 'fixed';

  particle.style.width = '6px';
  particle.style.height = '6px';

  particle.style.background = 'white';

  particle.style.borderRadius = '50%';

  particle.style.left =
  Math.random() * window.innerWidth + 'px';

  particle.style.top =
  window.innerHeight + 'px';

  particle.style.opacity = '0.5';

  particle.style.pointerEvents = 'none';

  particle.style.zIndex = '999';

  document.body.appendChild(particle);

  particle.animate([

    {
      transform: 'translateY(0px)',
      opacity: 1
    },

    {
      transform: 'translateY(-100vh)',
      opacity: 0
    }

  ], {

    duration: 4000

  });

  setTimeout(() => {

    particle.remove();

  },4000);

}

setInterval(createParticles, 300);