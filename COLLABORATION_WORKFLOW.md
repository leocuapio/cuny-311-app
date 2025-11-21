# Safe Collaboration Workflow Guide

## Current Setup
- **Origin (your fork):** `https://github.com/HuzayfahAwan/cuny-311-app.git`
- **Upstream (Leo's repo):** `https://github.com/leocuapio/cuny-311-app.git`

## Safe Workflow Steps

### 1. Always Start with Latest Code
Before starting any work, sync with Leo's main branch:

```bash
# Fetch latest changes from Leo's repo
git fetch upstream

# Make sure you're on your main branch
git checkout main

# Merge latest changes from Leo's main into your main
git merge upstream/main

# Push the updated main to your fork
git push origin main
```

### 2. Create a Feature Branch for Your Work
**NEVER work directly on main!** Always create a new branch:

```bash
# Create and switch to a new branch (use a descriptive name)
git checkout -b feature/your-feature-name

# Example: git checkout -b feature/admin-dashboard-filters
# Example: git checkout -b feature/backend-api-endpoints
```

### 3. Make Your Changes
- Work on your feature branch
- Commit frequently with clear messages:
  ```bash
  git add .
  git commit -m "Add: description of what you added"
  git commit -m "Fix: description of what you fixed"
  ```

### 4. Keep Your Branch Updated
If Leo merges Jason's PR or makes other changes while you're working:

```bash
# Switch back to main
git checkout main

# Pull latest changes
git fetch upstream
git merge upstream/main

# Switch back to your feature branch
git checkout feature/your-feature-name

# Merge main into your branch to get latest changes
git merge main
```

### 5. Push Your Branch and Create PR
When your work is ready:

```bash
# Push your branch to your fork
git push origin feature/your-feature-name
```

Then go to GitHub and create a Pull Request from:
- **From:** `HuzayfahAwan/cuny-311-app` → `feature/your-feature-name`
- **To:** `leocuapio/cuny-311-app` → `main`

### 6. After PR is Merged
Once Leo approves and merges your PR:

```bash
# Switch to main
git checkout main

# Pull the merged changes
git fetch upstream
git merge upstream/main

# Delete your local feature branch (optional cleanup)
git branch -d feature/your-feature-name

# Delete remote branch (optional cleanup)
git push origin --delete feature/your-feature-name
```

## Important Rules

✅ **DO:**
- Always work on a feature branch
- Pull latest changes before starting work
- Keep your feature branch updated with main
- Test your changes before pushing
- Write clear commit messages

❌ **DON'T:**
- Work directly on main branch
- Force push to main
- Merge your own PRs (let Leo review first)
- Work on someone else's branch

## Handling Jason's PR

If Jason's PR is merged while you're working:
1. Follow step 4 above to merge main into your branch
2. Resolve any conflicts if they occur
3. Test that everything still works
4. Continue with your work

## Quick Reference Commands

```bash
# Check current branch
git branch

# See all remotes
git remote -v

# See what's changed
git status

# See commit history
git log --oneline --graph --all
```

