/**
 * main.js - Core UI Logic, Theme Switcher, Filters, Modals & Toast System
 * Monpreet Singh Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- THEME TOGGLE (DARK / LIGHT) ---
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme') || (prefersDark ? 'dark' : 'dark');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
    }
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }

  // --- MOBILE NAVIGATION TOGGLE ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // --- NAVBAR SCROLL STATE & ACTIVE HIGHLIGHTER ---
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    allNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- PROJECT FILTERING ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- MODAL DIALOG SYSTEM ---
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  // Detailed Project Data
  const projectData = {
    'grasp-force': {
      title: 'Grasp Force Optimization as a Bilinear Matrix Inequality (BMI) Problem: A Deep Learning Approach',
      supervisor: 'Dr. Shyamanta M Hazarika, Professor & HOD, Dept. of Mechanical Engineering, IIT Guwahati',
      timeline: 'August 2024 – Present (M.Tech Thesis)',
      tags: ['Robotics', 'Convex Optimization', 'Deep Learning', 'BMIs', 'Python', 'MATLAB'],
      image: 'assets/images/project-grasp-force.jpg',
      content: `
        <h4>Project Overview & Mathematical Formulation</h4>
        <p>In multi-fingered robotic manipulation, determining the minimal contact forces required to firmly grasp and manipulate an object without slippage or object crushing is a fundamental challenge. The force closure condition and Coulomb friction cone constraints naturally lead to non-convex <strong>Bilinear Matrix Inequalities (BMIs)</strong>, which are NP-hard to solve in real time using conventional numerical solvers.</p>
        
        <div style="background: var(--bg-card); padding: 18px; border-radius: var(--radius-md); margin: 20px 0; border: 1px solid var(--border-subtle);">
          <h5 style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 8px;">Key Optimization Formulations:</h5>
          <ul style="font-size: 0.9rem; padding-left: 20px; color: var(--text-secondary); line-height: 1.8;">
            <li><strong>Equilibrium Constraint:</strong> $G \\cdot f = -w_{ext}$, where $G$ is the grasp matrix and $w_{ext}$ is external wrench.</li>
            <li><strong>Friction Cone Constraint:</strong> $\|f_{t,i}\| \\le \\mu_i \\cdot f_{n,i}$ modeled as second-order cone constraints (SOCP) or linearized polyhedral approximations.</li>
            <li><strong>Deep Learning Surrogate:</strong> Training neural networks to predict warm-start initializations for iterative branch-and-bound BMI solvers, achieving millisecond-level inference for dynamic robotics.</li>
          </ul>
        </div>

        <h4>Key Contributions:</h4>
        <ul style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px;">
          <li>Conducted an in-depth literature review spanning 40+ state-of-the-art papers on grasp synthesis, LMI/BMI relaxations, and learning-based contact mechanics.</li>
          <li>Formulated grasp force optimization as a convex optimization problem, validating force-closure feasibility against varied friction coefficients and payloads.</li>
          <li>Developed Python and MATLAB testbeds with modular support for robotic hands and irregular geometric objects.</li>
        </ul>
      `
    },
    'optimization-methods': {
      title: 'Function Optimization via Direct and Gradient-Based Search Methods',
      supervisor: 'Dr. Deepak Sharma, Professor, Dept. of Mechanical Engineering, IIT Guwahati',
      timeline: 'August 2024',
      tags: ['C Programming', 'Numerical Optimization', 'Bounding Phase', 'Bisection Method', 'Algorithms'],
      image: 'assets/images/project-optimization.jpg',
      content: `
        <h4>Algorithmic Architecture in C</h4>
        <p>Engineered high-performance numerical optimization routines from scratch in pure C language to eliminate overhead and achieve maximum computational throughput for non-linear single and multi-variable benchmark functions.</p>

        <div style="background: var(--bg-card); padding: 18px; border-radius: var(--radius-md); margin: 20px 0; border: 1px solid var(--border-subtle);">
          <h5 style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 8px;">Implemented Methods & Insights:</h5>
          <ul style="font-size: 0.9rem; padding-left: 20px; color: var(--text-secondary); line-height: 1.8;">
            <li><strong>Bounding Phase Method (Direct Search):</strong> Brackets the global/local optimum interval $[x_l, x_u]$ using an adaptive stepping algorithm $2^k \\cdot \\Delta$ without requiring derivative information.</li>
            <li><strong>Bisection Method (Gradient-Based):</strong> Leverages first-order derivative sign evaluation to successively halve the bracket interval until tolerance $\\epsilon < 10^{-6}$ is satisfied.</li>
            <li><strong>Benchmarking:</strong> Validated against classical unconstrained functions (Rosenbrock valley, unimodal parabolas, Himmelblau variations).</li>
          </ul>
        </div>

        <h4>Performance Highlights:</h4>
        <ul style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.8;">
          <li>Zero dependency on external linear algebra libraries; written strictly adhering to memory-safe C pointers and modular headers.</li>
          <li>Analyzed trade-offs between derivative-free exploration versus gradient-guided exploitation in complex engineering domains.</li>
        </ul>
      `
    },
    'cad-fea-analysis': {
      title: 'CAD Modeling & Finite Element Stress Analysis (FEA)',
      supervisor: 'IIT Guwahati & Assam Engineering College',
      timeline: '2021 – Present',
      tags: ['ANSYS Static Structural', 'ANSYS Fluent', 'SolidWorks', 'Solid Edge', 'AutoCAD'],
      image: 'assets/images/project-cad-fea.jpg',
      content: `
        <h4>Computational Solid & Fluid Mechanics</h4>
        <p>Extensive experience across industry-standard computer-aided design (CAD) and finite element analysis (FEA) suites for mechanical components, structural brackets, and fluid dynamics.</p>

        <div style="background: var(--bg-card); padding: 18px; border-radius: var(--radius-md); margin: 20px 0; border: 1px solid var(--border-subtle);">
          <h5 style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 8px;">Technical Scope:</h5>
          <ul style="font-size: 0.9rem; padding-left: 20px; color: var(--text-secondary); line-height: 1.8;">
            <li><strong>Static Structural Simulation:</strong> Von Mises stress, principal stresses, safety factors, and deflection under static and cyclic loading in ANSYS Workbench.</li>
            <li><strong>Machine Drawing Instruction:</strong> Led teaching sessions for undergraduate course ME215 utilizing Siemens Solid Edge, mastering orthographic projections, tolerances, and assembly mating.</li>
            <li><strong>CFD Explorations:</strong> Navier-Stokes discretization and boundary layer analysis using ANSYS Fluent.</li>
          </ul>
        </div>
      `
    }
  };

  // Open modal on Learn More click
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data && modalBody && modalBackdrop) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 24px;">
            <span class="section-tag" style="margin-bottom: 12px;">${data.timeline}</span>
            <h2 style="font-size: 1.75rem; margin-bottom: 8px; line-height: 1.3;">${data.title}</h2>
            <p style="color: var(--accent-purple); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 16px;">${data.supervisor}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
              ${data.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
            </div>
            <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px; border: 1px solid var(--border-subtle); max-height: 300px;">
              <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
          <div>${data.content}</div>
        `;
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // --- VIEW / PRINT CV MODAL HANDLER ---
  const btnViewCV = document.getElementById('btn-view-cv');
  if (btnViewCV) {
    btnViewCV.addEventListener('click', () => {
      if (modalBody && modalBackdrop) {
        modalBody.innerHTML = `
          <div class="print-hide" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="section-tag" style="margin-bottom: 6px;">Curriculum Vitae</span>
              <h2 style="font-size: 1.5rem; margin: 0;">Monpreet Singh — Resume</h2>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.print()" style="gap: 6px;">
              <span>🖨️ Print / Save as PDF</span>
            </button>
          </div>

          <div style="font-family: var(--font-body); color: var(--text-primary); line-height: 1.6;">
            <!-- Header -->
            <div style="border-bottom: 2px solid var(--accent-cyan); padding-bottom: 14px; margin-bottom: 20px;">
              <h1 style="font-size: 2rem; margin-bottom: 4px;">Monpreet Singh</h1>
              <p style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-secondary);">
                Roll No: 234103106 | M.Tech - Computational Mechanics, Dept. of Mechanical Engineering<br>
                <strong>Indian Institute of Technology (IIT), Guwahati</strong>
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px; font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-cyan);">
                <span>📞 +91-9864748082</span>
                <span>✉️ singhmomnpreet064@gmail.com</span>
                <span>🎓 s.monpreet@iitg.ac.in</span>
                <span>💼 linkedin.com/in/singh5164</span>
              </div>
            </div>

            <!-- Education -->
            <div style="margin-bottom: 22px;">
              <h3 style="font-size: 1.15rem; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 4px; margin-bottom: 12px;">Education</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                <thead>
                  <tr style="text-align: left; border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-family: var(--font-mono);">
                    <th style="padding: 6px 0;">Degree / Certificate</th>
                    <th style="padding: 6px;">Institute / Board</th>
                    <th style="padding: 6px;">CGPA / %</th>
                    <th style="padding: 6px; text-align: right;">Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px 0; font-weight: 600;">M.Tech (Computational Mechanics)</td>
                    <td style="padding: 8px;">IIT Guwahati</td>
                    <td style="padding: 8px; font-family: var(--font-mono);">6.82 (Current)</td>
                    <td style="padding: 8px; text-align: right; font-family: var(--font-mono);">2023 – Present</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px 0; font-weight: 600;">B.E. (Mechanical Engg.)</td>
                    <td style="padding: 8px;">Assam Engineering College</td>
                    <td style="padding: 8px; font-family: var(--font-mono);">80.00%</td>
                    <td style="padding: 8px; text-align: right; font-family: var(--font-mono);">2017 – 2021</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px 0;">Senior Secondary (Class XII)</td>
                    <td style="padding: 8px;">Sainik School, Goalpara</td>
                    <td style="padding: 8px; font-family: var(--font-mono);">87.20%</td>
                    <td style="padding: 8px; text-align: right; font-family: var(--font-mono);">2016</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">Secondary (Class X)</td>
                    <td style="padding: 8px;">Sainik School, Goalpara</td>
                    <td style="padding: 8px; font-family: var(--font-mono);">89.30%</td>
                    <td style="padding: 8px; text-align: right; font-family: var(--font-mono);">2014</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Projects -->
            <div style="margin-bottom: 22px;">
              <h3 style="font-size: 1.15rem; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 4px; margin-bottom: 12px;">Research Projects</h3>
              <div style="margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; font-weight: 600;">
                  <span>Grasp Force Optimization as a Bilinear Matrix Inequality Problem: A Deep Learning Approach</span>
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Aug 2024 – Present</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--accent-purple); font-family: var(--font-mono); margin-bottom: 6px;">
                  Dr. Shyamanta M Hazarika, Professor & HOD, Dept. of Mechanical Engineering, IIT Guwahati
                </div>
                <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 18px;">
                  <li>Conducting comprehensive literature review on traditional and modern grasp force optimization using BMIs.</li>
                  <li>Formulating grasp force optimization as a convex problem incorporating force closure and friction cone constraints.</li>
                </ul>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-weight: 600;">
                  <span>Optimization of a Function by Direct and Gradient Based Method to Find Optimal Solution</span>
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Aug 2024</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--accent-purple); font-family: var(--font-mono); margin-bottom: 6px;">
                  Dr. Deepak Sharma, Professor, Dept. of Mechanical Engineering, IIT Guwahati
                </div>
                <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 18px;">
                  <li>Implemented optimization routines in pure C using Direct Search (Bounding Phase) and Gradient Search (Bisection Method).</li>
                </ul>
              </div>
            </div>

            <!-- Teaching Experience -->
            <div style="margin-bottom: 22px;">
              <h3 style="font-size: 1.15rem; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 4px; margin-bottom: 12px;">Experience</h3>
              <div style="display: flex; justify-content: space-between; font-weight: 600;">
                <span>Teaching Assistant for ME215: Machine Drawing using SolidEdge</span>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Aug 2024 – Present</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 6px;">IIT Guwahati, Assam</div>
              <ul style="font-size: 0.85rem; color: var(--text-secondary); padding-left: 18px;">
                <li>Mentored students in mastering Siemens Solid Edge for machine drafting and 3D modeling.</li>
                <li>Conducted laboratory troubleshooting sessions and evaluated design submissions.</li>
              </ul>
            </div>

            <!-- Technical Skills & Achievements -->
            <div>
              <h3 style="font-size: 1.15rem; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 4px; margin-bottom: 12px;">Technical Skills & Achievements</h3>
              <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Programming:</strong> Python, C/C++, MATLAB, Linux/Bash</p>
              <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Software & Tools:</strong> SolidWorks, Solid Edge, AutoCAD, ANSYS Fluent, ANSYS Static Structural, Tecplot, GeoGebra</p>
              <p style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Honors:</strong> GATE 2023 (90 Percentile) | 23rd Rank North East National Cyber Olympiad | NCC 'A' Grade (Cert A & B)</p>
            </div>
          </div>
        `;
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Close modal
  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --- TOAST NOTIFICATION UTILITY ---
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = '✓') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--accent-cyan); font-weight: bold; font-size: 1.1rem;">${icon}</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- COPY TO CLIPBOARD BUTTONS ---
  document.querySelectorAll('.copy-data-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy. Please copy manually.', '⚠');
        });
      }
    });
  });

  // --- CONTACT FORM HANDLER ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('sender-subject').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', '⚠');
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:singhmomnpreet064@gmail.com,s.monpreet@iitg.ac.in?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
      
      showToast('Opening your email client to send message...', '🚀');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);

      contactForm.reset();
    });
  }
});
