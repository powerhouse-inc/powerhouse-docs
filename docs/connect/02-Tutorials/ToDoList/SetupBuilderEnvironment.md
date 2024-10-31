---
sidebar_position: 1
# sidebar_label: Connect
displayed_sidebar: connectSidebar
---

# Setup Builder Environment

Let's set up your computer to start building the ToDoList Document Model. Don't worry if this is your first time setting up a development environment - we'll guide you through each step!

## Prerequisites

Before we begin building our ToDoList Document Model, we need to install some software on your computer. We'll need three main tools: Node.js, which helps us run our code, Visual Studio Code (VS Code), which is where we'll write our code, and Git, which helps us manage our code. Follow the steps below based on your computer's operating system.

### Installing Node.js

Node.js is a tool that lets us run our application. Let's install it step by step.

#### For Windows:
1. Visit the [Node.js official website](https://nodejs.org/)
2. Click the big green button that says "LTS" (this means Long Term Support - it's the most stable version)
3. Once the installer downloads, double-click it to start installation
4. Click "Next" through the installation wizard, leaving all settings at their defaults
5. After installation, we need to verify it worked. Here's how:
   - Press the Windows key + R on your keyboard
   - Type "cmd" and press Enter to open Command Prompt
   - In the black window that appears, type these commands one at a time and press Enter after each:
   ```bash
   node --version
   npm --version
   ```
   You should see numbers appear after each command (like v18.17.0). If you do, congratulations - Node.js is installed!

#### For macOS:
1. First, let's install Homebrew (a tool that helps install other software):
   - Open Terminal (you can find it by pressing Command + Space and typing "Terminal")
   - Copy and paste this command into Terminal and press Enter:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   - Follow any additional instructions that appear
2. Now install Node.js:
   - In the same Terminal window, type this command and press Enter:
   ```bash
   brew install node
   ```
3. Let's verify the installation:
   - In Terminal, type these commands one at a time and press Enter after each:
   ```bash
   node --version
   npm --version
   ```
   If you see numbers appear (like v18.17.0), you've successfully installed Node.js!

#### For Linux (Ubuntu/Debian):
1. First, open Terminal:
   - Press Ctrl + Alt + T on your keyboard, or
   - Click the Activities button and type "Terminal"
2. Update your system's package list by typing this command and pressing Enter:
   ```bash
   sudo apt update
   ```
   - When asked for your password, type it (note: you won't see the characters as you type - this is normal!)
3. Install Node.js and npm by typing this command and pressing Enter:
   ```bash
   sudo apt install nodejs npm
   ```
   - Type 'Y' and press Enter if asked to confirm
4. Verify everything is working:
   - Type these commands one at a time and press Enter after each:
   ```bash
   node --version
   npm --version
   ```
   If you see numbers appear after each command, you're all set!

### Installing Visual Studio Code

VS Code is the editor we'll use to write our code. Here's how to install it:

#### For Windows:
1. Visit the [Visual Studio Code website](https://code.visualstudio.com/)
2. Click the blue "Download for Windows" button
3. Once the installer downloads, double-click it
4. Accept the license agreement and click "Next"
5. Leave the default installation location and click "Next"
6. In the Select Additional Tasks window, make sure "Add to PATH" is checked
7. Click "Next" and then "Install"
8. When installation is complete, click "Finish"

#### For macOS:
1. Visit the [Visual Studio Code website](https://code.visualstudio.com/)
2. Click the blue "Download for Mac" button
3. Once the .zip file downloads, double-click it to extract
4. Drag Visual Studio Code.app to the Applications folder
5. Double-click the app to launch it
6. To make VS Code available in your terminal:
   - Open VS Code
   - Press Command + Shift + P
   - Type "shell command" and select "Install 'code' command in PATH"

#### For Linux (Ubuntu/Debian):
1. Open Terminal (Ctrl + Alt + T)
2. First, update the packages list:
   ```bash
   sudo apt update
   ```
3. Install the dependencies needed to add Microsoft's repository:
   ```bash
   sudo apt install software-properties-common apt-transport-https wget
   ```
4. Import Microsoft's GPG key:
   ```bash
   wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
   ```
5. Add the VS Code repository:
   ```bash
   sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
   ```
6. Install VS Code:
   ```bash
   sudo apt install code
   ```
7. Once installed, you can launch VS Code by:
   - Typing `code` in the terminal, or
   - Finding it in your Applications menu

### 3. Install Git

#### Windows
1. Visit the [Git website](https://git-scm.com/)
2. Download the latest version for Windows
3. Run the installer and use these recommended settings:
   - Select "Use Git from Git Bash only" during installation
   - Choose "Use the OpenSSL library" for HTTPS
   - Select "Checkout Windows-style, commit Unix-style line endings"
   - Choose "Use MinTTY"
   - Enable "Enable Git Credential Manager"
4. Verify installation by opening Command Prompt:
   ```bash
   git --version
   ```

#### Mac
1. Install using Homebrew:
   ```bash
   brew install git
   ```
2. Verify installation:
   ```bash
   git --version
   ```

#### Linux (Ubuntu/Debian)
1. Update package list:
   ```bash
   sudo apt update
   ```
2. Install Git:
   ```bash
   sudo apt install git
   ```
3. Verify installation:
   ```bash
   git --version
   ```

### 4. Configure Git (All Systems)
After installation, set up your identity:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 5. Verify Installation

Open Visual Studio Code and create a new terminal (Terminal > New Terminal). Run the following commands to verify your setup:
```bash
node --version
npm --version
git --version
```

You should see version numbers displayed for all commands. You're now ready to start building your ToDoList Document Model!
