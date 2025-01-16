# Run Your Powerhouse Project on a Cloud Server

This tutorial will guide you through publishing your Powerhouse project as a package and running it on a cloud server. Let's start with some key concepts that will help you understand the process.

## Key Concepts

- **Powerhouse Hosting Apps**: The 2 applications where your project will run:
  - Connect: A real-time collaborative app that allows you to build your document models and editors to work in a shared environment.
  - Switchboard: Switchboard will be used to manage your server instance, the database of your project and the reactor that will synchronize your project across different instances.

- **Powerhouse Package**: The `ph-cmd` CLI tool available on NPM that provides access to Powerhouse commands

- **Powerhouse Projects**: Your custom projects containing document models and editors

## Prerequisites for this tutorial

- Basic understanding of [document models](docs/connect/01-Document-Models/01-intro.md) and editors. If you've never heard of document models or document model editors then this tutorial is too advanced for you. Please get familiar with document models or our tutorials ToDoList & Chatroom where you'll be guided through the setup of your document models. 
- Node.js and npm installed
- An AWS account (In this specific tutorial we are deploying to AWS)

## 1. Setting Up Your NPM Organization

Create an organization on [NPM](https://www.npmjs.com/) using the naming convention: `@yourorganization-ph`
   - The `-ph` suffix indicates it's a Powerhouse ecosystem package to help you and others identify it from regular NPM packages. 
   - Example: `@acme-ph`

Now that you’ve set up your organization you’ve got all the right requirements to later publish your project for others to use and install on their servers. 

## 2. Building your project 

To start the setup of your project with it’s dedicated document models and editors we’ll run the following command:

  ```bash
   npm create document-model-lib
   ```

   > 💡 For experimental features, use --version [version] which allows selecting a specific branch of our document-model-boilerplate. There are --dev, --staging and --main options. Select `npm create document-model-lib --dev` to use the latest development version. Please be aware that this version can contain bugs and experimental features that aren’t fully tested.  

This command will start the configuration of your powerhouse project. When you are creating your own project, you will be asked to name your project. Which will also become the package name when someone else wants to install it in a cloud environment via npm. 

Please feel free to navigate to the package.json file and fill in all the other available fields such as `name`, `version`, `author`, `license` and `main`.

  ```bash
{  
"name": "@your-org/package-name",  
"version": "1.0.0", 
"author": "Your Name",
"license": "AGPL-3.0-only",
"main": "index.js"  
}
```

Now that you’ve created your powerhouse project you are ready to generate the necessary directory and file structure to start populating your project with document models.   
For this purpose you can use your preferred package manager, pnpm, bun, yarn or npm with the command. 

`npm run generate`

### 3.1. Adding Document Models, editors and unit tests
Now that you’ve set up your directory. Go ahead and add the document models you’d like to add by generating the scaffolding code, implementing the reducer code and unit tests, as well as the document editors. Run unit tests and verify the editor functionality via \`npm run connect\` for local testing.		  

### 3.2. Verifying your project
Now that we’ve completed our directory with the necessary files and our project is populated with document models we’ll verify everything before publishing. 

Let’s verify the package build output and see if our documents are working correctly.   
run `npm run build` & `npm run serve`  

OR 

Before you publish, it’s wise to ensure everything works as expected.

From the root of your project, run:
`npm install`
This installs dependencies based on your package.json.

### 3.3. Publishing your project

Since you've already registered your organization on npm, you can now publish your project to the npm registry. 
Log in via the command line:

`npm login`

You’ll be prompted for your username, password, and email.

Now configure npm (Optional But Recommended)
If you’re publishing a package under a scope (like @your-org/my-package), you might need to adjust the publishConfig to ensure it’s public 	otherwise scoped packages default to private:

```json
{
  "name": "@your-org/my-package",
  "version": "1.0.0",
  "main": "index.js",
  "publishConfig": {
    "access": "public"
  }
}
```

Run the following command to publish your project to the npm registry:
`npm publish`

If publishing a scoped package and you want it public, run:
`npm publish --access public`

Let’s verify that the package(s) get published in the package repository, next to pre-existing packages that you might have been publishing before. [NPM](https://www.npmjs.com/) 

## 3. Setting up your cloud environment 
### 3.1. Launching your server instance (AWS \- EC2 \- Ubuntu)

Let's have a look at how to set up Connect & Switchboard apps on a cloud server.
Ask your IT provider to get access to the AWS environment to set up a server in AWS  
Launch a new server instance for Connect and Switchboard with the specific specs that fit your project. 

1. Create an EC2 instance:
   - Make sure your region is eu-west-1 (Ireland)
   - Name your instance something like `connect-server` or your project name
   - Select the Ubuntu 24.04 LTS
   - Scroll down to instance type: t2.medium (recommended)
   - Create a new key pair and save it in a secure location
   - **Launch the instance**


### 3.2. Setting up your SSH connection

Once you’ve generated your keypairs and added them in the folder you’ll set up the SSH connections from which you can start the process. 

SSH, which stands for **Secure Shell**, is a cryptographic network protocol used to securely access and manage devices over an unsecured network. It provides a secure channel over an unsecured network by using encryption, ensuring that data transmitted between your computer and the server remains confidential and tamper-proof.

To establish an SSH connection, you'll typically use an SSH client. On Unix-like systems (Linux, macOS), the SSH client is usually pre-installed.   
Follow the instructions of the AWS instance you’ve configured with Ubuntu and set up your connection by adding the necessary commands in your terminal.

![Setting up your SSH connection](images/SSHConnection.png)

Your ubuntu instance is usually always a little out of date. So use the following commands to get it up to speed. 

   ```bash
   sudo apt update && sudo apt upgrade
   ```

### 3.3. Installing Required Software. 

Now that we’ve connected to our ubuntu instance we’ll need to install the necessary services on our server to get things going, such as Nvm, Node, NPM etc. 

For this, our team has set up a small script that will help you to automate a series of installations.  

packages/ph-cli/scripts/service-setup.sh (How do we offer this?)

The script contains the following commands and will help you set up with

   ```bash
   # Install NVM
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
   source ~/.nvm/nvm.sh
   nvm --version

   # Install Node.js
   nvm install 20

   # Install package managers and tools
   npm install -g pnpm
   pnpm setup
   source ~/.bashrc
   
   # Install Powerhouse CLI
   pnpm install -g ph-cmd

   # Install PM2 process manager
   npm install -g pm2
   sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
   ```

- **NVM**: Node Version Manager for managing Node.js versions
- **Node.js**: JavaScript runtime (v20 recommended)
- **PM2**: Process manager for Node.js applications
- **ph-cmd**: Powerhouse CLI tool for managing projects
- **pnpm**: Fast, disk space efficient package manager


## 4. Deploying the hosting apps & project

1. **Install your project package** we've published earlier on the server instance.
	   ```bash
	   ph install your-org/project
	   ```

2. **Start the Switchboard service** and run the following command to boot the reactor
	```bash
	pnpm run ph reactor
	```
	Let's verify that the reactor has detected your project and is ready to start through the graphQL playground.
	
	Now let's shut it down and add it as a system service on the server with the following command:
	```bash
	pm2 stop reactor
	```

3. **Start the Connect service** so we can start interacting with our project.
	```bash
	pnpm run ph connect
	```
	Let's verify that the connect service is running and we can start interacting with our project.
	Let's also shut it down and add it as a system service on the server
	```bash
	pm2 stop connect
	```	

	Alternatively you can use the following command to stop all services:
	```bash
	pm2 stop all
	```

4. **Verify installation**
   ```bash
   ph --help  # Should show available commands
   ```

## 5. Verify your project is running on your server

- Open up the server domain in your browser and you should see your project running.
- Add the switchboard instance as a remote drive
- Verify that synchronization is working and your document is available
- Try to make a change to your document and see if it's reflected in another instance.
- Query the document through the graphQL playground
