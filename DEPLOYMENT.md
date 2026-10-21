# 🚀 Deployment Guide: Launch Your Portfolio Website for Free

Congratulations, **Monpreet**! Your personal portfolio website is completely built and ready to be launched to the world.

Because this portfolio is built with clean, standards-compliant HTML5, Vanilla CSS3, and JavaScript with local assets, **it requires zero server build pipelines and can be hosted 100% free forever** with exceptional speed and security (HTTPS included).

---

## 🌟 Quick Comparison: Which Hosting Method Should You Choose?

| Platform | Best For | Deploy Time | Custom Domain Support |
| :--- | :--- | :--- | :--- |
| **GitHub Pages** *(Recommended)* | Direct connection to your GitHub profile | ~2 mins | ✅ Yes (Free) |
| **Vercel** | Fastest CI/CD & preview links | ~1 min | ✅ Yes (Free) |
| **Netlify Drop** | Zero CLI / No git required (Instant drag-and-drop) | ~30 seconds | ✅ Yes (Free) |
| **Cloudflare Pages** | Maximum global edge CDN performance | ~2 mins | ✅ Yes (Free) |

---

## 🥇 Method 1: Deploy with GitHub Pages (Recommended)

Having your portfolio on `https://<your-username>.github.io` looks great for an engineer and researcher.

### Step 1: Initialize Git and Commit
Open Terminal in this project folder:
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Monpreet Singh Portfolio Website"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Set the **Repository name**:
   - For a user site: `<your-username>.github.io` (e.g., `singh5164.github.io`)
   - Or as a project repository: `portfolio`
3. Set visibility to **Public**.
4. Click **Create repository** (do not initialize with README since you already have one).

### Step 3: Push Your Code
In your terminal, link your remote and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<repository-name>.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top menu) → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Select `main`, folder `/ (root)`, and click **Save**.
4. Wait 60–90 seconds. Your live URL will appear at the top:
   ```
   https://<your-username>.github.io
   ```

---

## ⚡ Method 2: Deploy with Netlify Drop (Fastest — 30 Seconds, No Git Needed)

If you want the site live right now without touching Git:

1. Open your browser and go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Sign in or sign up (free).
3. Drag and drop the folder `/Users/singh5164/Documents/Website Building Portfolio` onto the dropzone.
4. Netlify will immediately publish your website and provide a live URL like `https://monpreet-singh.netlify.app`.
5. Under **Site Configuration** → **Change site name**, you can customize your URL (e.g., `monpreetsingh.netlify.app`).

---

## 🔺 Method 3: Deploy with Vercel

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New...** → **Project**.
3. Select your GitHub repository (`singh5164.github.io` or `portfolio`).
4. Leave all build settings at default (Framework: **Other** / Root directory: `./`).
5. Click **Deploy**.
6. In ~15 seconds, your site is deployed to `https://<project-name>.vercel.app`.

---

## 🌐 Custom Domain Setup (Optional)

If you purchase a custom domain like `monpreetsingh.com` or `monpreetsingh.in` (from GoDaddy, Namecheap, Cloudflare, etc.):

### On GitHub Pages:
1. Go to **Settings** → **Pages** → **Custom domain**.
2. Enter `monpreetsingh.com` and save.
3. In your domain registrar DNS settings:
   - Add a `CNAME` record: `www` pointing to `<your-username>.github.io`.
   - Add `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Check **Enforce HTTPS**.

---

## 💻 Running & Testing Locally

Anytime you want to test modifications locally before publishing:

```bash
# In the project directory:
python3 -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.

---

## 📋 Checklist Before Sharing

- [x] Tested responsive design on desktop, tablet, and mobile.
- [x] Verified interactive Robotic Grasp Simulator & 1D Optimizer canvas.
- [x] Verified Dark/Light mode theme switching.
- [x] Checked project Deep Dive modals and all links.
- [x] Verified contact links: email addresses, phone, and LinkedIn.
- [x] Verified CV view and print preview (`Ctrl+P` / `Cmd+P`).
