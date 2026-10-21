#!/bin/bash
set -e

echo "=========================================================="
echo "🚀 Monpreet Singh Portfolio - GitHub Pages Auto-Deployer"
echo "=========================================================="

REPO_NAME="Monpreet64.github.io"

# Step 1: Check GitHub authentication
if ! gh auth status >/dev/null 2>&1; then
    echo "⚠️  GitHub authentication required."
    echo "👉 Logging in via browser..."
    gh auth login -h github.com -p https -w
fi

echo "✅ Authenticated with GitHub!"

# Step 2: Create repo and push if it doesn't exist
if gh repo view "Monpreet64/$REPO_NAME" >/dev/null 2>&1; then
    echo "📦 Repository Monpreet64/$REPO_NAME already exists on GitHub."
    echo "Pushing latest commits..."
    git push -u origin main
else
    echo "📦 Creating public repository Monpreet64/$REPO_NAME on GitHub and pushing..."
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
fi

# Step 3: Enable GitHub Pages
echo "🌐 Configuring GitHub Pages..."
gh api -X POST "repos/Monpreet64/$REPO_NAME/pages" -f source='{"branch":"main","path":"/"}' 2>/dev/null || echo "GitHub Pages configuration already active or queued."

echo ""
echo "=========================================================="
echo "🎉 DEPLOYMENT COMPLETE!"
echo "Your portfolio will be live at:"
echo "👉 https://monpreet64.github.io"
echo "=========================================================="
