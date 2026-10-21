/**
 * particles.js - Interactive Finite Element Mesh & Node Canvas Background
 * Computational mechanics aesthetic with interactive stress links
 */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initDimensions() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    // Number of particles based on screen area
    const particleCount = Math.floor((width * height) / 18000);
    const count = Math.min(Math.max(particleCount, 40), 90);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        baseX: 0,
        baseY: 0
      });
    }
  }

  function getColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      node: isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(0, 240, 255, 0.5)',
      line: isLight ? 'rgba(2, 132, 199, ' : 'rgba(0, 240, 255, ',
      accentLine: isLight ? 'rgba(124, 58, 237, ' : 'rgba(139, 92, 246, '
    };
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const colors = getColors();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position
      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interactive deflection
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.node;
      ctx.fill();

      // Draw element interconnecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = (i % 3 === 0) ? `${colors.accentLine}${alpha})` : `${colors.line}${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    initDimensions();
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  initDimensions();
  createParticles();
  requestAnimationFrame(animate);
})();
