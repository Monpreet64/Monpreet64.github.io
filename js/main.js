/**
 * main.js - Core UI Logic, Theme Switcher, Academic Modals & Contact Utilities
 * Monpreet Singh Academic Portfolio (IIT Kharagpur)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // THEME TOGGLE (LIGHT [DEFAULT ACADEMIC] / DARK)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('academic-portfolio-theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('academic-portfolio-theme', theme);
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

  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
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

  // ==========================================================================
  // NAVBAR SCROLL SHADOW & ACTIVE SECTION HIGHLIGHTER
  // ==========================================================================
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 100;

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

  // ==========================================================================
  // ACADEMIC PROJECT DATA & MODALS
  // ==========================================================================
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  const projectDetails = {
    'leaf-spring': {
      title: 'Design and Fatigue Failure Analysis of a Leaf Spring using ANSYS',
      institution: 'Assam Engineering College, Guwahati (Assam Science and Technology University)',
      type: 'B.E. Final Year Capstone Project',
      image: 'assets/images/project-leaf-spring.jpg',
      tools: ['ANSYS Workbench', 'Static Structural FEA', 'ANSYS Fatigue Tool', 'SolidWorks', 'AutoCAD'],
      content: `
        <div style="margin-bottom: 20px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-bottom: 8px;">
            1. Problem Statement & Motivation
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75; margin-bottom: 14px;">
            Multi-leaf springs serve as the fundamental suspension and shock-damping component in automotive and commercial freight vehicles. During service operation, leaf springs are subjected to fluctuating and cyclic dynamic loads induced by road surface irregularities, bumps, and varying payload distributions. These cyclic stresses often lead to micro-crack propagation, localized plastic deformation, and catastrophic fatigue failure before the intended structural design life is reached.
          </p>

          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-top: 20px; margin-bottom: 8px;">
            2. CAD Modeling & Boundary Conditions
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75; margin-bottom: 12px;">
            A semi-elliptic leaf spring assembly consisting of a master leaf with rolled eye bushings, graduated leaves, and center rebound bolt was modeled in 3D using SolidWorks and imported into ANSYS Workbench:
          </p>
          <ul style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.75; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>Boundary Conditions:</strong> Fixed support constrained at the front master leaf eye in all three translation directions, and a pivoting shackle frame assembly at the rear eye allowing longitudinal displacement to accommodate deflection elongation.</li>
            <li><strong>Applied Loading:</strong> Standard vehicle design payload applied vertically at the axle perch center clamp interface under nominal and peak impact conditions.</li>
            <li><strong>Discretization & Mesh:</strong> High-density hex-dominant sweep meshing in critical eye-transition curvature and frictional contact regions between consecutive leaves.</li>
          </ul>

          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-top: 20px; margin-bottom: 8px;">
            3. Finite Element Stress & Fatigue Evaluation
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75; margin-bottom: 12px;">
            Static structural simulations were executed to evaluate:
          </p>
          <ul style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.75; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>Von Mises Stress Distribution:</strong> Maximum equivalent stress concentrations occurred on the upper tensile surface of the master leaf adjacent to the fixed eye and central clamping bolt.</li>
            <li><strong>Deflection Profile:</strong> Maximum camber deflection remained within permissible automotive chassis clearance tolerances.</li>
            <li><strong>Fatigue Life & Damage Accumulation:</strong> Utilizing the ANSYS Fatigue Tool module with the Stress-Life (S-N) approach and Goodman mean stress correction, the minimum fatigue life cycles and factor of safety contour maps were computed under constant and variable amplitude cyclic road vibrations.</li>
          </ul>

          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-top: 20px; margin-bottom: 8px;">
            4. Key Conclusions
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75;">
            The computational analysis verified that optimizing leaf thickness taper and incorporating parabolic graduated profiles significantly reduces localized peak stress concentrations, thereby enhancing total fatigue life and preventing premature suspension failure.
          </p>
        </div>
      `
    },
    'optimization-methods': {
      title: 'Function Optimization via Direct and Gradient-Based Search Methods',
      institution: 'Assam Engineering College / Core Algorithms',
      type: 'Computational Optimization Algorithms',
      image: 'assets/images/project-optimization.jpg',
      tools: ['C Programming', 'Bounding Phase Method', 'Bisection Method', 'Numerical Analysis', 'Algorithms'],
      content: `
        <div style="margin-bottom: 20px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-bottom: 8px;">
            1. Algorithmic Overview in Pure C
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75; margin-bottom: 14px;">
            Engineered standalone numerical search algorithms in pure ANSI C to eliminate library overhead, investigate numerical round-off dynamics, and benchmark convergence speed across non-linear unconstrained mathematical functions.
          </p>

          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-top: 20px; margin-bottom: 8px;">
            2. Implemented Optimization Techniques
          </h4>
          <ul style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.75; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>Bounding Phase Method (Direct Search):</strong> A derivative-free bracketing algorithm that guarantees bracketing of a local or global minimum for any unimodal function by expanding step size exponentially until a function value reversal occurs, successfully bracketing the optimum interval.</li>
            <li><strong>Bisection Method (Gradient-Based):</strong> Leverages first-order derivative sign evaluation to successively halve the search interval. Evaluates the midpoint slope to determine the descent direction, achieving rapid linear convergence with minimal computational overhead.</li>
          </ul>

          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-top: 20px; margin-bottom: 8px;">
            3. Results & Convergence Benchmarking
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75;">
            Validated against standard benchmark test functions (Rosenbrock parabolic valleys, unimodal polynomial functions). Demonstrated robust convergence within tight numerical tolerance while maintaining zero memory leaks and safe pointer arithmetic.
          </p>
        </div>
      `
    },
    'cad-fea-analysis': {
      title: 'CAD Modeling & Finite Element Stress Analysis (FEA)',
      institution: 'CAD & Finite Element Modeling Studies',
      type: 'Mechanical Design & CAE Simulation',
      image: 'assets/images/project-cad-fea.jpg',
      tools: ['ANSYS Static Structural', 'SolidWorks', 'Siemens Solid Edge', 'AutoCAD', 'Stress Analysis'],
      content: `
        <div style="margin-bottom: 20px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-bottom: 8px;">
            1. Scope of Investigation
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.75; margin-bottom: 14px;">
            Comprehensive mechanical design, 3D modeling, and finite element structural simulations evaluating mechanical parts, structural brackets, and assembly components under static and cyclic loading conditions.
          </p>

          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-heading); margin-top: 20px; margin-bottom: 8px;">
            2. Tools & Methodologies
          </h4>
          <ul style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.75; padding-left: 20px; margin-bottom: 16px;">
            <li><strong>ANSYS Static Structural:</strong> Modeled von Mises equivalent stresses, principal stresses, safety factors, and displacement contours under distributed and point loads. Conducted mesh independence studies to ensure convergence.</li>
            <li><strong>SolidWorks & Siemens Solid Edge:</strong> Parametric 3D solid modeling, orthographic projections, geometric dimensioning and tolerancing (GD&T), and kinematic assembly interference checks.</li>
            <li><strong>AutoCAD:</strong> Detailed manufacturing drafting adhering to standard mechanical drafting codes and section views.</li>
          </ul>
        </div>
      `
    }
  };

  // Open Project Modal
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];

      if (data && modalBody && modalBackdrop) {
        modalBody.innerHTML = `
          <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 18px; margin-bottom: 24px;">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--primary-navy); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em;">
              ${data.type} · ${data.institution}
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-heading); line-height: 1.3; margin-bottom: 14px; text-wrap: balance;">
              ${data.title}
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;">
              ${data.tools.map(t => `<span class="tag-academic">${t}</span>`).join('')}
            </div>
            <div style="border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-color); max-height: 320px; margin-bottom: 14px;">
              <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            </div>
          </div>
          <div>${data.content}</div>
        `;
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // ==========================================================================
  // CURRICULUM VITAE (CV) VIEWER MODAL
  // ==========================================================================
  function openCVModal() {
    if (modalBody && modalBackdrop) {
      modalBody.innerHTML = `
        <div class="print-hide" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary-navy); text-transform: uppercase; letter-spacing: 0.05em;">Curriculum Vitae</div>
            <h2 style="font-family: var(--font-serif); font-size: 1.5rem; margin: 0; color: var(--text-heading);">Monpreet Singh — Academic CV</h2>
          </div>
          <button class="btn btn-academic btn-academic-sm" onclick="window.print()" style="gap: 6px;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div style="font-family: var(--font-sans); color: var(--text-main); line-height: 1.65;">
          <!-- CV Header -->
          <div style="border-bottom: 2px solid var(--primary-navy); padding-bottom: 16px; margin-bottom: 22px;">
            <h1 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-heading); margin-bottom: 4px;">Monpreet Singh</h1>
            <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 8px;">
              <strong>Ph.D. Research Scholar</strong><br>
              Department of Industrial and Systems Engineering<br>
              <strong>Indian Institute of Technology (IIT) Kharagpur</strong>, West Bengal 721302, India
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
              <span>🏛️ s.monpreet26@kgpian.iitkgp.ac.in</span>
              <span>✉️ singhmomnpreet064@gmail.com</span>
              <span>📞 +91-9864748082</span>
              <span>💼 linkedin.com/in/singh5164</span>
            </div>
          </div>

          <!-- Academic Affiliation & Supervisors -->
          <div style="margin-bottom: 22px; background: var(--bg-alt); padding: 14px 18px; border-radius: var(--radius-sm); border-left: 3px solid var(--primary-navy);">
            <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Doctoral Research Guidance:</div>
            <div style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
              <strong>Supervisor:</strong> Prof. Mamata Jenamani (Professor, Dept. of Industrial and Systems Engineering, IIT Kharagpur)<br>
              <strong>Co-Supervisor:</strong> Prof. Jitendra Kumar Jha (Professor, Dept. of Industrial and Systems Engineering, IIT Kharagpur)
            </div>
          </div>

          <!-- Education Table -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary-navy); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 12px;">
              EDUCATION
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
              <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color); color: var(--text-muted);">
                  <th style="padding: 8px 0;">Degree / Qualification</th>
                  <th style="padding: 8px;">Institution / University</th>
                  <th style="padding: 8px; text-align: right;">Score / Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 10px 0; font-weight: 600; color: var(--text-heading);">
                    Ph.D. in Industrial and Systems Engineering
                  </td>
                  <td style="padding: 10px;">Indian Institute of Technology (IIT) Kharagpur</td>
                  <td style="padding: 10px; text-align: right; font-weight: 600; color: var(--primary-navy);">
                    GATE 2026 Qualified (Direct Ph.D. Entry)
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 10px 0; font-weight: 600; color: var(--text-heading);">
                    Bachelor of Engineering (B.E.) in Mechanical Engineering
                  </td>
                  <td style="padding: 10px;">Assam Engineering College, Guwahati (Assam Science and Technology University)</td>
                  <td style="padding: 10px; text-align: right; font-family: var(--font-mono);">80.00% (First Class)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 10px 0;">Senior Secondary (CBSE Class XII)</td>
                  <td style="padding: 10px;">Sainik School, Goalpara</td>
                  <td style="padding: 10px; text-align: right; font-family: var(--font-mono);">87.20%</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">Secondary School (CBSE Class X)</td>
                  <td style="padding: 10px;">Sainik School, Goalpara</td>
                  <td style="padding: 10px; text-align: right; font-family: var(--font-mono);">89.30%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Research Projects -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary-navy); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 12px;">
              RESEARCH & CAPSTONE PROJECTS
            </h3>

            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-weight: 600; color: var(--text-heading);">
                <span>Design and Fatigue Failure Analysis of a Leaf Spring using ANSYS (B.E. Capstone Project)</span>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Assam Engineering College</span>
              </div>
              <ul style="font-size: 0.875rem; color: var(--text-secondary); padding-left: 20px; margin-top: 4px; line-height: 1.7;">
                <li>Conducted 3D parametric CAD modeling and finite element static structural analysis in ANSYS Workbench.</li>
                <li>Analyzed von Mises stress contours, max camber deflection, and factor of safety under cyclic road shocks.</li>
                <li>Evaluated fatigue life and damage accumulation with ANSYS Fatigue Tool using S-N curves and Goodman correction.</li>
              </ul>
            </div>

            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-weight: 600; color: var(--text-heading);">
                <span>Function Optimization via Direct and Gradient-Based Search Methods</span>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">C Language</span>
              </div>
              <ul style="font-size: 0.875rem; color: var(--text-secondary); padding-left: 20px; margin-top: 4px; line-height: 1.7;">
                <li>Engineered numerical optimization routines from scratch in pure C adhering to safe pointer arithmetic.</li>
                <li>Implemented Bounding Phase Method (direct search bracketing) and Bisection Method (gradient search root-finding).</li>
              </ul>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-weight: 600; color: var(--text-heading);">
                <span>CAD Modeling & Finite Element Stress Analysis (FEA)</span>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Simulation Suites</span>
              </div>
              <ul style="font-size: 0.875rem; color: var(--text-secondary); padding-left: 20px; margin-top: 4px; line-height: 1.7;">
                <li>Evaluated component stress concentrations across ANSYS Static Structural, SolidWorks, and Siemens Solid Edge.</li>
              </ul>
            </div>
          </div>

          <!-- Technical Skills -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary-navy); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 12px;">
              TECHNICAL & COMPUTATIONAL SKILLS
            </h3>
            <p style="font-size: 0.875rem; margin-bottom: 6px; line-height: 1.6;">
              <strong>Programming & Computing:</strong> Python (NumPy, SciPy, Matplotlib), C / C++, MATLAB, Linux / Bash
            </p>
            <p style="font-size: 0.875rem; margin-bottom: 6px; line-height: 1.6;">
              <strong>CAE & CAD Packages:</strong> ANSYS Workbench (Static Structural, Fatigue Tool, Fluent), SolidWorks, Siemens Solid Edge, AutoCAD
            </p>
            <p style="font-size: 0.875rem; margin-bottom: 6px; line-height: 1.6;">
              <strong>Quantitative Methods:</strong> Operations Research, Mathematical Optimization, Numerical Methods, Finite Element Analysis
            </p>
            <p style="font-size: 0.875rem; line-height: 1.6;">
              <strong>Scientific Tools:</strong> LaTeX, Microsoft Excel (Data Modeling), Git & GitHub, Tecplot, GeoGebra
            </p>
          </div>

          <!-- Honors & Awards -->
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary-navy); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 12px;">
              HONORS, AWARDS & ACTIVITIES
            </h3>
            <ul style="font-size: 0.875rem; color: var(--text-secondary); padding-left: 20px; line-height: 1.7;">
              <li><strong>GATE 2026 Qualified:</strong> Direct admission to Ph.D. programme in Industrial and Systems Engineering at IIT Kharagpur.</li>
              <li><strong>GATE 2023 Qualified:</strong> 90 Percentile in Mechanical Engineering.</li>
              <li><strong>National Cyber Olympiad:</strong> 23rd Rank across North East India (Certificate of Excellence).</li>
              <li><strong>National Cadet Corps (NCC):</strong> 'A' Grade in Certificate A & B; All India Trekking Expedition & National Adventure Programme (Pachmarhi, Grade 'A').</li>
              <li><strong>Organizing Member:</strong> National Level Quiz Competition, Assam Engineering College.</li>
              <li><strong>Fundraiser & Volunteer:</strong> Ranbhoomi Impact League, IIM Indore & HERO Group.</li>
            </ul>
          </div>
        </div>
      `;
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  const btnNavCV = document.getElementById('btn-view-cv');
  const btnHeroCV = document.getElementById('btn-hero-cv');
  if (btnNavCV) btnNavCV.addEventListener('click', openCVModal);
  if (btnHeroCV) btnHeroCV.addEventListener('click', openCVModal);

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

  // ==========================================================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = '✓') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--primary-navy); font-weight: bold; font-size: 1.1rem;">${icon}</span>
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

  // ==========================================================================
  // COPY-TO-CLIPBOARD FUNCTIONALITY
  // ==========================================================================
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

  // ==========================================================================
  // ACADEMIC CONTACT FORM HANDLER
  // ==========================================================================
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

      // Generate mailto link directed to institute and personal email
      const recipientEmails = 's.monpreet26@kgpian.iitkgp.ac.in,singhmomnpreet064@gmail.com';
      const mailtoUrl = `mailto:${recipientEmails}?subject=${encodeURIComponent(subject || 'Academic Inquiry from ' + name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;

      showToast('Opening your email client to send inquiry...', '✉️');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
    });
  }
});
