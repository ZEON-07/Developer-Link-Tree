# 🌳 Developer Link Tree — Git & GitHub Workshop

Welcome to the **Developer Link Tree** starter project! This repository is designed specifically for beginners learning Git and GitHub in a hands-on collaborative workshop.

---

## 🚀 Project Setup

Follow these steps to set up the project on your local machine:

### 1. Fork the Repository
Click the **Fork** button at the top-right corner of the GitHub repository page to create a copy in your personal GitHub account.

### 2. Clone Your Fork
Open your terminal (or Git Bash) and run:
```bash
git clone https://github.com/<YOUR-USERNAME>/developer-link-tree.git
cd developer-link-tree
```

### 3. Open in Your Code Editor
Open the folder in your favorite code editor (e.g., VS Code):
```bash
code .
```

### 4. Preview the Project
Open `index.html` in your browser by:
- Double-clicking `index.html` from your file manager, **or**
- Using a local development extension like VS Code's **Live Server**.

---

## 🛠️ Workshop Issues & Challenges

Participants should work through the following challenges by creating feature branches, committing their changes, and opening Pull Requests (PRs).

---

### 📌 Issue #1: Center the Main Container Using CSS Flexbox
* **Goal:** Center the `#main-container` element both horizontally and vertically on the viewport.
* **Tasks:**
  1. Open `style.css`.
  2. Apply CSS Flexbox to the `body` element:
     - Set `min-height: 100vh`.
     - Set `display: flex`.
     - Align items to the center (`align-items: center; justify-content: center;`).
     - Set flex direction if needed (`flex-direction: column;`).
  3. Give `#main-container` a sensible `max-width` (e.g., `480px`), width (e.g., `90%`), padding, and optional background color or card styling.
* **Suggested Git Workflow:**
  ```bash
  git checkout -b feat/center-container
  # Make changes in style.css
  git add style.css
  git commit -m "style: center main container with flexbox"
  git push origin feat/center-container
  ```

---

### 📌 Issue #2: Add Smooth Hover State Transitions to Buttons
* **Goal:** Make the link buttons visually interactive with smooth hover transitions.
* **Tasks:**
  1. Open `style.css`.
  2. Style `.link-btn` with:
     - Display: `block` or `inline-block`
     - Padding, border-radius, background color, and text color.
     - A base `transition` property (e.g., `transition: all 0.3s ease;` or `transition: transform 0.2s ease, background-color 0.2s ease;`).
  3. Add a `:hover` and `:focus-visible` pseudo-class for `.link-btn`:
     - Change background or text color.
     - Add a subtle lift using `transform: translateY(-2px);` or `transform: scale(1.02);`.
     - Add a box shadow for depth (e.g., `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);`).
* **Suggested Git Workflow:**
  ```bash
  git checkout -b feat/button-hover
  # Make changes in style.css
  git add style.css
  git commit -m "style: add smooth hover state transitions to buttons"
  git push origin feat/button-hover
  ```

---

### 📌 Issue #3: Add a Footer with Three SVG Social Media Icons
* **Goal:** Add a semantic `<footer>` element to `index.html` containing clickable SVG icons for three social platforms (e.g., GitHub, LinkedIn, and X/Twitter).
* **Tasks:**
  1. Open `index.html`.
  2. Beneath the `.links-section` (inside or right below `main`), add a `<footer>` element.
  3. Include three accessible social links wrapping inline SVG icons or external SVG files:
     - Use `target="_blank"` and `rel="noopener noreferrer"` for external links.
     - Include accessible labels (such as `aria-label="GitHub Profile"`).
  4. In `style.css`, layout the icons horizontally with appropriate spacing (`gap: 1rem; display: flex; justify-content: center;`).
* **Suggested Git Workflow:**
  ```bash
  git checkout -b feat/footer-social-icons
  # Make changes in index.html and style.css
  git add index.html style.css
  git commit -m "feat: add footer with social media SVG icons"
  git push origin feat/footer-social-icons
  ```

---

### 💥 Issue #4: Merge Conflict Challenge (`contributors.html`)
* **Goal:** Intentionally generate and resolve a Git merge conflict to practice conflict resolution.
* **The Scenario:**
  Multiple participants will edit the exact same lines of a newly created `contributors.html` file simultaneously.

* **Instructions:**
  1. **Participant A & Participant B** pull the latest `main` branch:
     ```bash
     git checkout main
     git pull origin main
     ```
  2. Each participant creates their own feature branch:
     ```bash
     git checkout -b feat/add-<your-name>
     ```
  3. Create (or edit) `contributors.html` with an HTML list structure:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <title>Contributors</title>
     </head>
     <body>
       <h1>Workshop Contributors</h1>
       <ul>
         <!-- Everyone inserts their name on line 12 right below this comment -->
         <li>Your Name - @your-github-username</li>
       </ul>
     </body>
     </html>
     ```
  4. Both participants commit and push their branches:
     ```bash
     git add contributors.html
     git commit -m "feat: add <your-name> to contributors list"
     git push origin feat/add-<your-name>
     ```
  5. **Participant A** merges their pull request into `main` first (or merges locally).
  6. **Participant B** attempts to merge or rebase against `main`:
     ```bash
     git checkout main
     git pull origin main
     git checkout feat/add-<your-name>
     git merge main
     ```
  7. **Boom! Conflict detected:**
     ```
     CONFLICT (content): Merge conflict in contributors.html
     Automatic merge failed; fix conflicts and then commit the result.
     ```

* **How to Resolve the Merge Conflict:**
  1. Open `contributors.html` in your code editor.
  2. Locate the conflict markers:
     ```html
     <<<<<<< HEAD (Current Change - Participant B)
         <li>Bob - @bobdev</li>
     =======
         <li>Alice - @alicedev</li>
     >>>>>>> main (Incoming Change - Participant A)
     ```
  3. Edit the file so **both** names are preserved in the list:
     ```html
         <li>Alice - @alicedev</li>
         <li>Bob - @bobdev</li>
     ```
  4. Delete all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
  5. Stage and commit the resolved file:
     ```bash
     git add contributors.html
     git commit -m "fix: resolve merge conflict in contributors list"
     git push origin feat/add-<your-name>
     ```
  6. Now the Pull Request can be cleanly merged! 🎉

---

## 📚 Useful Git Commands Cheat Sheet

| Command | Description |
| :--- | :--- |
| `git status` | Check working tree status |
| `git branch` | List local branches |
| `git checkout -b <branch-name>` | Create and switch to a new branch |
| `git add <file>` | Stage changes for commit |
| `git commit -m "<message>"` | Commit staged changes |
| `git pull origin main` | Fetch and merge changes from remote `main` |
| `git push origin <branch-name>` | Push branch to GitHub |
| `git diff` | View unstaged changes |
