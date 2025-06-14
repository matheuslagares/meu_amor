// canvas.js
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let width, height, stars = [], comets = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }
}

function createComet() {
  const size = Math.random() * 2 + 1.5;
  comets.push({
    x: -100,
    y: Math.random() * height / 2,
    vx: Math.random() * 3 + 2,
    vy: Math.random() * 1 + 0.5,
    size,
    trail: []
  });
}

function drawComets() {
  comets.forEach((comet, index) => {
    comet.x += comet.vx;
    comet.y += comet.vy;

    comet.trail.push({ x: comet.x, y: comet.y });
    if (comet.trail.length > 30) comet.trail.shift();

    for (let i = 0; i < comet.trail.length; i++) {
      const opacity = i / comet.trail.length;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.arc(comet.trail[i].x, comet.trail[i].y, comet.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    if (comet.x > width + 100 || comet.y > height + 100) {
      comets.splice(index, 1);
    }
  });
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';

  stars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;

    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  drawComets();
  requestAnimationFrame(drawStars);
}

function loopCometas() {
  if (Math.random() < 0.8) createComet();
  setTimeout(loopCometas, Math.random() * 6000 + 4000);
}

// Inicialização
window.addEventListener('resize', () => {
  resizeCanvas();
  createStars(150);
});

resizeCanvas();
createStars(150);
drawStars();
loopCometas();

// temporizador.js
const dataInicial = new Date("2024-02-24T00:00:00");

function atualizarTemporizador() {
  const agora = new Date();

  let anos = agora.getFullYear() - dataInicial.getFullYear();
  let meses = agora.getMonth() - dataInicial.getMonth();
  let dias = agora.getDate() - dataInicial.getDate();
  let horas = agora.getHours() - dataInicial.getHours();
  let minutos = agora.getMinutes() - dataInicial.getMinutes();
  let segundos = agora.getSeconds() - dataInicial.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  document.getElementById('anos').textContent = anos;
  document.getElementById('meses').textContent = meses;
  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = String(horas).padStart(2, '0');
  document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
  document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

setInterval(atualizarTemporizador, 1000);
atualizarTemporizador();
