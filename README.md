# Monpreet Singh — Portfolio Website

> **M.Tech in Computational Mechanics | Indian Institute of Technology (IIT), Guwahati**  
> Specializing in Robotic Grasp Force Optimization, Convex Optimization, Deep Learning, and CAD/FEA Simulation.

A personal portfolio website showcasing academic research, technical publications, engineering skillsets, interactive simulations, and leadership experience.

---

## ✨ Features & Architecture

- **Interactive Robotics & Optimization Virtual Lab**:
  - **Robotic Grasp Force Simulator**: Live 2-finger gripper physics model computing normal clamping forces ($F_n$), friction cone conditions ($\mu$), tangential disturbance limits, and real-time force closure stability margins.
  - **1D Direct & Gradient Search Optimizer**: Interactive step-by-step visualizer for the Bounding Phase and Bisection optimization methods implemented in C.
- **Finite Element Node Canvas**: Dynamic interactive background with interconnected nodes reacting to cursor proximity.
- **Comprehensive Project Deep Dives**:
  - *Grasp Force Optimization as a Bilinear Matrix Inequality (BMI) Problem: A Deep Learning Approach* (Dr. Shyamanta M Hazarika, Prof & HOD, ME, IIT Guwahati).
  - *Optimization of a Function by Direct and Gradient Based Method* (Dr. Deepak Sharma, Prof, ME, IIT Guwahati).
  - *CAD Modeling & Finite Element Stress Analysis (FEA)* across ANSYS Static Structural, ANSYS Fluent, SolidWorks, and Solid Edge.
- **Technical Skills Matrix & Coursework**: Detailed breakdown of programming languages (Python, C/C++, MATLAB), simulation suites, and advanced coursework (Continuum Mechanics, Numerical Analysis, ML, Robotics).
- **Academic & Experience Timeline**: Teaching Assistant for ME215 (Machine Drawing using SolidEdge), Saathi Counselling Cell Peer Mentor, and NCC Leadership honors.
- **Printable Curriculum Vitae**: Built-in modal resume viewer with dedicated print media stylesheet for one-click clean PDF export (`window.print()`).
- **Dark & Light Mode**: Accessible design system with custom CSS variables and persistent theme selection.
- **Contact Hub**: Instant copy-to-clipboard for email/phone with toast alerts, direct `mailto:` handler, and LinkedIn integration.

---

## 📁 Project Structure

```
├── index.html                   # Semantic, accessible HTML5 structure
├── css/
│   └── style.css                # Vanilla CSS design tokens, glassmorphism, responsive grid & print rules
├── js/
│   ├── main.js                  # Modals, project filters, theme toggle, toast alerts, CV handler
│   ├── particles.js             # Interactive FEM node & element canvas background
│   └── simulator.js             # Physics-based robotic grasp & optimization engine
├── assets/
│   └── images/
│       ├── hero-bg.jpg          # Computational mechanics banner visual
│       ├── project-grasp-force.jpg # Grasp force optimization 3D render
│       ├── project-optimization.jpg # Mathematical optimization loss landscape
│       ├── project-cad-fea.jpg  # Finite element analysis simulation workstation
│       └── avatar.jpg           # Monpreet Singh profile badge icon
├── DEPLOYMENT.md                # Step-by-step guide to launch for free
└── README.md                    # Project documentation
```

---

## 💻 Local Development

To run the site locally on your computer:

```bash
# Clone or navigate to the directory
cd "/Users/singh5164/Documents/Website Building Portfolio"

# Start the local server
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 🚀 Deployment

Refer to [`DEPLOYMENT.md`](DEPLOYMENT.md) for detailed instructions on launching this website for free via **GitHub Pages**, **Vercel**, or **Netlify**.

---

## 📬 Contact

- **Name**: Monpreet Singh
- **Institution**: Indian Institute of Technology (IIT), Guwahati
- **Academic Email**: [s.monpreet@iitg.ac.in](mailto:s.monpreet@iitg.ac.in)
- **Personal Email**: [singhmomnpreet064@gmail.com](mailto:singhmomnpreet064@gmail.com)
- **Phone**: +91-9864748082
- **LinkedIn**: [linkedin.com/in/singh5164](https://www.linkedin.com/in/singh5164)
