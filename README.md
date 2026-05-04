# DroneX Delivery Platform — Setup & Installation

This repository contains the DroneX web platform (frontend + backend). This README provides minimal, up-to-date setup and installation instructions to get a clean `main` (or `main-clean`) branch ready for development.

## Repository layout
- `backend/` — Python Flask backend
- `DroneX-Frontend/` — Next.js frontend

## Prerequisites
- Git
- Node.js (v18+ or v20 recommended) and `npm`
- Python 3.9+ and `python`/`pip`

## Backend (local dev)
1. Create and activate a Python virtual environment (recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run the backend (development):
   ```bash
   cd backend
   python app.py
   ```
The backend will typically listen on port 5000.

## Frontend (local dev)
1. Install dependencies and start the dev server:
   ```bash
   cd DroneX-Frontend
   npm install
   npm run dev
   ```
2. Open http://localhost:3000 in your browser.

## Creating a clean `main` branch and Pull Request workflow
This repo contains feature branches on the remote. Recommended approach:

1. Create a new branch `main-clean` from the canonical remote `main`:
   ```bash
   git fetch origin main
   git checkout -b main-clean origin/main
   ```
2. Add or update this README on `main-clean`, commit and push:
   ```bash
   git add README.md
   git commit -m "chore: add clean README for main-clean"
   git push -u origin main-clean
   ```
3. Create pull requests on GitHub from each feature branch (e.g. `Platform`, `login`) into `main-clean` so you can review changes before merge.
   - Use the GitHub web UI or the GitHub CLI (`gh`) to open PRs and perform code review.

4. After review, merge each PR into `main-clean`. When `main-clean` is stable, create a PR from `main-clean` into `main` (or push `main-clean` to replace `main` with care).

## If you want me to handle this for you
- I can create `main-clean`, add this README, push the branch, and prepare everything for PRs. To open and merge PRs for you automatically I need one of the following:
  - `gh` (GitHub CLI) installed and authenticated on this machine, or
  - a GitHub personal access token (PAT) so I can call the GitHub API (you would need to provide it), or
  - you can perform the PR merges yourself via GitHub UI after I push `main-clean`.

Tell me which option you prefer. If you want me to proceed fully (create PRs and merge), I can push `main-clean` now and either:
- provide commands for you to run locally to create/merge PRs, or
- if you install `gh` here or provide a PAT, I will create and merge PRs automatically.

---
If you'd like I can also generate a short checklist for reviewing each feature branch before merging.
