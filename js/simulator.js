/**
 * simulator.js - Interactive Robotics Grasp Force & Optimization Simulator
 * Demonstrates Monpreet Singh's M.Tech Research at IIT Guwahati
 */

(function () {
  const canvas = document.getElementById('gripper-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Controls
  const sliderForce = document.getElementById('slider-force');
  const sliderMu = document.getElementById('slider-mu');
  const sliderLoad = document.getElementById('slider-load');
  
  const valForce = document.getElementById('val-force');
  const valMu = document.getElementById('val-mu');
  const valLoad = document.getElementById('val-load');
  
  // Metrics
  const metricFmax = document.getElementById('metric-fmax');
  const metricAngle = document.getElementById('metric-angle');
  const metricMargin = document.getElementById('metric-margin');
  const telemetryStatus = document.getElementById('telemetry-status');
  const telemetryMath = document.getElementById('telemetry-math');

  const btnReset = document.getElementById('btn-sim-reset');
  const btnToggleMode = document.getElementById('btn-sim-mode');

  let currentMode = 'gripper'; // 'gripper' or 'optimization'
  let optStep = 0;
  let optInterval = [-2, 8];
  let optPoints = [];

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio || 500;
    canvas.height = rect.height * window.devicePixelRatio || 380;
  }

  function renderGripper() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Values from sliders
    const Fn = parseFloat(sliderForce.value); // Normal force (N)
    const mu = parseFloat(sliderMu.value);   // Friction coeff
    const Fext = parseFloat(sliderLoad.value); // Disturbance (N)

    // Physics calculation
    const Fmax = mu * Fn; // Max friction per contact
    const totalMaxFriction = 2 * Fmax; // 2 contact points
    const coneAngleDeg = (Math.atan(mu) * 180 / Math.PI).toFixed(1);
    const coneAngleRad = Math.atan(mu);
    const isStable = totalMaxFriction >= Fext;
    const safetyMargin = ((totalMaxFriction - Fext) / totalMaxFriction * 100).toFixed(0);

    // Update UI numbers
    valForce.textContent = `${Fn.toFixed(0)} N`;
    valMu.textContent = mu.toFixed(2);
    valLoad.textContent = `${Fext.toFixed(0)} N`;

    metricFmax.textContent = `${totalMaxFriction.toFixed(1)} N`;
    metricAngle.textContent = `±${coneAngleDeg}°`;
    metricMargin.textContent = isStable ? `+${safetyMargin}%` : `-${Math.abs(safetyMargin)}%`;
    metricMargin.style.color = isStable ? 'var(--accent-emerald)' : '#ef4444';

    if (isStable) {
      telemetryStatus.textContent = '● FORCE CLOSURE: STABLE';
      telemetryStatus.classList.remove('slip');
      telemetryMath.textContent = `Ft (${(Fext/2).toFixed(1)}N) ≤ μ·Fn (${Fmax.toFixed(1)}N)`;
    } else {
      telemetryStatus.textContent = '▲ SLIP DETECTED: UNSTABLE';
      telemetryStatus.classList.add('slip');
      telemetryMath.textContent = `Ft (${(Fext/2).toFixed(1)}N) > μ·Fn (${Fmax.toFixed(1)}N)`;
    }

    // Coordinates setup
    const cx = w / 2;
    const cy = h / 2 + 10;
    const objectRadius = Math.min(w, h) * 0.18;

    // Draw coordinate grid lines (HUD aesthetic)
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw Grasp Object (Cylinder cross-section)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, objectRadius, 0, Math.PI * 2);
    const gradObj = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, objectRadius);
    gradObj.addColorStop(0, isLight ? '#94a3b8' : '#1e293b');
    gradObj.addColorStop(1, isLight ? '#475569' : '#0f172a');
    ctx.fillStyle = gradObj;
    ctx.fill();
    ctx.strokeStyle = isStable ? 'var(--accent-cyan)' : '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Center crosshair
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 15, cy);
    ctx.lineTo(cx + 15, cy);
    ctx.moveTo(cx, cy - 15);
    ctx.lineTo(cx, cy + 15);
    ctx.stroke();

    ctx.fillStyle = isLight ? '#0f172a' : '#f8fafc';
    ctx.font = '12px Space Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PAYLOAD', cx, cy - 8);
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
    ctx.fillText(`m·g = ${Fext} N ↓`, cx, cy + 12);
    ctx.restore();

    // Draw Contact Points & Friction Cones
    // Contact 1: Left finger (cx - objectRadius, cy)
    // Contact 2: Right finger (cx + objectRadius, cy)
    const contacts = [
      { x: cx - objectRadius, y: cy, normalDir: 1, side: 'left' },
      { x: cx + objectRadius, y: cy, normalDir: -1, side: 'right' }
    ];

    contacts.forEach((pt) => {
      // 1. Friction Cone visual
      const coneLength = 70;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      const angle1 = pt.normalDir === 1 ? -coneAngleRad : Math.PI - coneAngleRad;
      const angle2 = pt.normalDir === 1 ? coneAngleRad : Math.PI + coneAngleRad;

      const p1x = pt.x + Math.cos(angle1) * coneLength;
      const p1y = pt.y + Math.sin(angle1) * coneLength;
      const p2x = pt.x + Math.cos(angle2) * coneLength;
      const p2y = pt.y + Math.sin(angle2) * coneLength;

      ctx.lineTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.closePath();

      ctx.fillStyle = isStable 
        ? 'rgba(0, 240, 255, 0.15)' 
        : 'rgba(239, 68, 68, 0.15)';
      ctx.fill();

      ctx.strokeStyle = isStable ? 'rgba(0, 240, 255, 0.6)' : 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 2. Normal Force Vector (Fn)
      const fnArrowLen = (Fn / 100) * 55;
      const normalTargetX = pt.x + pt.normalDir * fnArrowLen;
      drawArrow(ctx, pt.x, pt.y, normalTargetX, pt.y, '#00f0ff', 2);

      // 3. Tangential Friction Force Vector (Ft resists disturbance downwards, so points upwards)
      const ftActual = Fext / 2;
      const ftVisualLen = (ftActual / 50) * 45;
      drawArrow(ctx, pt.x, pt.y, pt.x, pt.y - ftVisualLen, '#10b981', 2);

      // 4. Gripper Finger Pad
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      const padWidth = 14;
      const padHeight = 44;
      const padX = pt.side === 'left' ? pt.x - padWidth : pt.x;
      ctx.fillRect(padX, pt.y - padHeight / 2, padWidth, padHeight);
      ctx.strokeRect(padX, pt.y - padHeight / 2, padWidth, padHeight);

      // Contact point glowing dot
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isStable ? '#00f0ff' : '#ef4444';
      ctx.fill();
    });

    // Draw External Disturbance Force Vector (Downwards on payload)
    const extLen = (Fext / 80) * 50;
    drawArrow(ctx, cx, cy + objectRadius, cx, cy + objectRadius + extLen, '#f59e0b', 3);
  }

  function renderOptimization() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Plot axes
    const originX = 60;
    const originY = h - 50;
    const plotW = w - 100;
    const plotH = h - 130;

    // Subtitle on canvas below telemetry
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillStyle = isLight ? '#0284c7' : '#00f0ff';
    ctx.textAlign = 'left';
    ctx.fillText('Objective: f(x) = (x - 3)² + 2 | Click Canvas to Iterate Step', originX, 68);

    ctx.strokeStyle = isLight ? '#94a3b8' : '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + plotW, originY);
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - plotH);
    ctx.stroke();

    // Map math coords [-1 to 7] -> canvas coords
    function toCanvas(x, y) {
      const cx = originX + ((x - (-1)) / (7 - (-1))) * plotW;
      const cy = originY - (y / 20) * plotH;
      return { x: cx, y: cy };
    }

    // Draw Function Curve
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = -1; x <= 7; x += 0.1) {
      const y = Math.pow(x - 3, 2) + 2;
      const pt = toCanvas(x, y);
      if (x === -1) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    // Minimum point marker at (3, 2)
    const minPt = toCanvas(3, 2);
    ctx.beginPath();
    ctx.arc(minPt.x, minPt.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillStyle = '#10b981';
    ctx.fillText('Optimal Min: x* = 3.0', minPt.x + 12, minPt.y);

    // Draw current search interval
    const ptA = toCanvas(optInterval[0], 0);
    const ptB = toCanvas(optInterval[1], 0);

    ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.fillRect(ptA.x, originY - plotH, ptB.x - ptA.x, plotH);

    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ptA.x, originY);
    ctx.lineTo(ptA.x, originY - plotH);
    ctx.moveTo(ptB.x, originY);
    ctx.lineTo(ptB.x, originY - plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Update telemetry status for optimization
    telemetryStatus.textContent = `● ITERATION ${optStep} | INTERVAL: [${optInterval[0].toFixed(2)}, ${optInterval[1].toFixed(2)}]`;
    telemetryStatus.classList.remove('slip');
    telemetryMath.textContent = `Δx = ${(optInterval[1] - optInterval[0]).toFixed(3)}`;
  }

  function drawArrow(context, fromx, fromy, tox, toy, color, width) {
    const headlen = 8;
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    context.save();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();

    context.beginPath();
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.closePath();
    context.fill();
    context.restore();
  }

  function render() {
    if (currentMode === 'gripper') {
      renderGripper();
    } else {
      renderOptimization();
    }
  }

  // Event Listeners for Sliders
  [sliderForce, sliderMu, sliderLoad].forEach((slider) => {
    slider.addEventListener('input', () => {
      if (currentMode === 'gripper') render();
    });
  });

  // Reset Button
  btnReset.addEventListener('click', () => {
    sliderForce.value = 45;
    sliderMu.value = 0.45;
    sliderLoad.value = 25;
    optInterval = [-1, 7];
    optStep = 0;
    render();
  });

  // Toggle Mode Button (Gripper vs Optimization)
  if (btnToggleMode) {
    btnToggleMode.addEventListener('click', () => {
      if (currentMode === 'gripper') {
        currentMode = 'optimization';
        btnToggleMode.textContent = 'View Robotic Grasp Model';
        document.querySelector('.controls-header h3').textContent = 'Direct Search / Bisection Optimizer';
        document.querySelector('.controls-header p').textContent = 'Iterative bracketing and gradient descent convergence simulation.';
      } else {
        currentMode = 'gripper';
        btnToggleMode.textContent = 'View Optimization Method';
        document.querySelector('.controls-header h3').textContent = 'Robotic Grasp Force Simulator';
        document.querySelector('.controls-header p').textContent = 'Test friction cone condition and stability margin in real time.';
      }
      render();
    });
  }

  // Click canvas during optimization mode to step forward
  canvas.addEventListener('click', () => {
    if (currentMode === 'optimization') {
      const mid = (optInterval[0] + optInterval[1]) / 2;
      optStep++;
      // Since min is at 3, narrow down interval
      if (3 < mid) {
        optInterval[1] = mid;
      } else {
        optInterval[0] = mid;
      }
      render();
    }
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    render();
  });

  // Init
  resizeCanvas();
  render();
})();
