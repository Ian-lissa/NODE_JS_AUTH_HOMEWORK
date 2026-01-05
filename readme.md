# 📚 Node.js Authentication System - Assignment Guide

## 🎯 Assignment Overview

**Dear Student,**

Welcome to your Node.js assignment! Based on what you learned from the Node.js crash course video, you'll be building a complete authentication system from scratch. This is a **hands-on, learn-by-doing** assignment that will solidify your understanding of Node.js fundamentals.

---

## 🤔 What is Git and GitHub?

Before we start, let's understand the tools you'll be using:

### **Git** - Your Local Time Machine ⏰
- **What it is**: A version control system that tracks changes to your code
- **Why use it**: 
  - Save different versions of your work (like save points in a game)
  - Go back to previous versions if something breaks
  - Track your progress
  - Collaborate with others

### **GitHub** - Your Online Code Portfolio 🌐
- **What it is**: A platform to store your Git repositories online
- **Why use it**:
  - Backup your code to the cloud
  - Showcase your work to future employers
  - Access your code from anywhere
  - Get feedback on your code

**Analogy**: Think of Git as taking photos of your project at different stages, and GitHub as the photo album where you store and share those photos.

---

## 📂 **PROJECT STRUCTURE - YOUR BLUEPRINT**

Here's exactly how you should organize your project files. **Create these exact files and folders** in your project directory:

```
NODE_JS_AUTH_HOMEWORK/
│
├── .gitignore                 # Git ignore file
│
├── README.md                  # Project documentation
│
├── server.js                  # MAIN SERVER FILE - Your entry point
│
├── users.json                 # JSON file to store user data
│
├── package.json               # Node.js project configuration
│
├── public/                    # ALL FRONTEND FILES GO HERE
│   │
│   ├── index.html             # Home page with navigation
│   │
│   ├── register.html          # User registration form
│   │
│   ├── login.html             # User login form
│   │
│   ├── dashboard.html         # Welcome page after login
│   │
│   ├── style.css              # Stylesheet for all pages
│   │
│   └── script.js              # Frontend JavaScript logic
│
└── screenshots/               # Folder for project screenshots
    │
    └── (empty - you'll add screenshots here later)
```

---

## 🚀 **STEP-BY-STEP SETUP INSTRUCTIONS**

### **Step 1: Fork the Repository (On GitHub)**

1. Go to: **https://github.com/lionel-hue/NODE_JS_AUTH_HOMEWORK**
2. Click the **"Fork"** button (top right corner)
   - This creates a copy in YOUR GitHub account
3. Wait for GitHub to create your fork
4. You now have: `https://github.com/YOUR_USERNAME/NODE_JS_AUTH_HOMEWORK`

### **Step 2: Clone to Your Computer**

Open your terminal/command prompt and run:

```bash
# Navigate to where you want to store projects
cd Desktop  # or wherever you prefer

# Clone YOUR forked repository
git clone https://github.com/YOUR_USERNAME/NODE_JS_AUTH_HOMEWORK.git

# Enter the project folder
cd NODE_JS_AUTH_HOMEWORK
```

### **Step 3: Initialize Your Project**

```bash
# Initialize as a Node.js project
npm init -y

# Check what files were created
ls -la
```

---

## 📝 **CREATING THE FILES - ONE BY ONE**

### **Phase 1: Setup Files**

1. **Create `.gitignore`**
```bash
touch .gitignore
```
Add this content:
```
node_modules/
.DS_Store
.env
```

2. **Create `README.md`**
```bash
touch README.md
```
Add basic project description.

3. **Create `users.json`**
```bash
touch users.json
```
Add: `[]` (empty array)

### **Phase 2: Create the `public/` folder and its contents**

```bash
# Create the public folder
mkdir public

# Navigate into it
cd public

# Create all HTML files
touch index.html register.html login.html dashboard.html

# Create CSS and JS files
touch style.css script.js

# Go back to main folder
cd ..
```

### **Phase 3: Create `server.js`**
```bash
touch server.js
```

---

## 🔄 **GIT WORKFLOW - Your Commit Schedule**

**IMPORTANT:** You MUST commit after completing each major step. This is part of the assignment!

### **Commit 1: Project Setup**
```bash
# After creating basic structure
git add .
git commit -m "Initial setup: Created project structure"
```

### **Commit 2: Basic Server**
```bash
# After creating server.js with basic HTTP server
git add server.js
git commit -m "Created basic HTTP server on port 2000"
```

### **Commit 3: HTML Pages**
```bash
# After creating all HTML files
git add public/*.html
git commit -m "Created all HTML pages: home, register, login, dashboard"
```

### **Commit 4: Styling**
```bash
# After creating CSS
git add public/style.css
git commit -m "Added CSS styling for all pages"
```

### **Commit 5: Frontend Logic**
```bash
# After creating JavaScript
git add public/script.js
git commit -m "Added frontend JavaScript for form handling"
```

### **Commit 6: Backend Logic**
```bash
# After implementing registration/login logic
git add server.js users.json
git commit -m "Implemented user registration and login functionality"
```

### **Commit 7: Final Touches**
```bash
# After everything works
git add .
git commit -m "Completed authentication system - all features working"
```

---

## 📱 **PUSHING TO GITHUB - Share Your Work**

After each commit, or at the end, push to GitHub:

```bash
# Push your code to GitHub
git push origin main

# Check your work is online
# Visit: https://github.com/YOUR_USERNAME/NODE_JS_AUTH_HOMEWORK
```

---

## 🎨 **WHAT TO BUILD - Functional Requirements**

### **Pages to Create:**

1. **Home Page** (`/` or `/index.html`)
   - Welcome message
   - Links to Register and Login
   - Basic styling

2. **Registration Page** (`/register`)
   - Form with: Username, Email, Password fields
   - Submit button
   - Link to Login page

3. **Login Page** (`/login`)
   - Form with: Username, Password fields
   - Submit button
   - Link to Registration page

4. **Dashboard Page** (`/dashboard`)
   - Welcome message with username
   - Display the "Leron Posteum" text (like VS Code placeholder)
   - Logout option
   - Celebrate your success! 🎉

### **Server Endpoints:**
- `GET /` → Serve home page
- `GET /register` → Serve registration page
- `POST /register` → Handle registration
- `GET /login` → Serve login page
- `POST /login` → Handle login
- `GET /dashboard` → Serve dashboard

### **Data Storage:**
- Store users in `users.json` file
- Each user: `{id, username, email, password, createdAt}`

---

## ⏰ **TWO-DAY DEVELOPMENT PLAN**

### **Day 1: Foundation**
- Morning: Setup project & create all empty files
- Afternoon: Build basic server with routing
- Evening: Create all HTML pages with basic structure

### **Day 2: Functionality**
- Morning: Add CSS styling
- Afternoon: Implement registration logic
- Evening: Implement login logic and dashboard

---

## 🆘 **TROUBLESHOOTING TIPS**

1. **Server won't start?**
   - Check if port 2000 is already in use
   - Look for syntax errors in `server.js`

2. **Pages not loading?**
   - Check your file paths in `server.js`
   - Ensure files are in the `public/` folder

3. **Forms not submitting?**
   - Check browser console for errors
   - Verify your fetch requests in `script.js`

4. **Git issues?**
   ```bash
   # Check status
   git status
   
   # See what changed
   git diff
   
   # Undo changes to a file
   git checkout -- filename
   ```

---

## ✅ **SUCCESS CHECKLIST**

- [ ] Forked the repository to your account
- [ ] Cloned to your computer
- [ ] Created ALL files in the correct structure
- [ ] Server runs on `localhost:2000`
- [ ] Can navigate between all pages
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Dashboard displays after login
- [ ] Made at least 5 Git commits
- [ ] Pushed code to your GitHub repository

---

## 🎉 **YOU CAN DO THIS!**

Remember:
1. **Start simple** - Get something working first
2. **Test often** - Check your progress frequently
3. **Google is your friend** - When stuck, search for specific errors
4. **Break it down** - One small problem at a time
5. **Celebrate small wins** - Each working feature is progress!

**The goal isn't perfection - it's learning!** Every error you solve makes you a better developer.

Good luck, and remember to **commit your progress** as you go! 💪

---

**When complete:** Share your GitHub repository link so we can see your amazing work! 🌟