# Run Your Powerhouse Project on a Cloud Server

## Tutorial Workflow

This tutorial will guide you through publishing your Powerhouse project as a package and running it on a cloud server. The schema below will help you understand all of the context switching we'll in the process of our lengthy tutorial. 

Within the Powerhouse ecosystem users should be start with an empty Connect or Switchboard instance and download the relevant package for their use-case or workflow. In our case the 'appstore' will initially be represented by the 'node package manager registry' where users can download the relevant packages.


![tutorial schema](images/tutorialschema.png)


## Key Concepts

Let's start with some key concepts that will help you understand the process.

- **Powerhouse Host Apps**: The 2 applications where your project will run:
  - **Connect**: A real-time collaborative app that allows you to build your document models and editors to work in a shared environment.
  - **Switchboard**: Switchboard will be used to manage your server instance, the database of your project and the reactor that will synchronize your project across different instances.
- **Powerhouse Project**: The construction site of your package: A project is build with document models and editors which you will publish to NPM as a package with modules.
- **Powerhouse Modules**: The modules that are part of your project, such as the document models, editors, processors or scripts
- **Powerhouse Package**: A package is a collection of modules that are published to NPM and can be installed on a server instance or locally on your machine. Different organizations can have different packages.

![Key Concepts](images/keyconcepts.png)

## Prerequisites for this tutorial

- Basic understanding of [document models](docs/connect/01-Document-Models/01-intro.md) and editors. If you've never heard of document models or document model editors then this tutorial is too advanced for you. Please get familiar with document models or our tutorials ToDoList & Chatroom where you'll be guided through the setup of your document models. 
- Node.js and npm installed
- An AWS account (In this specific tutorial we are deploying to AWS)

## 1. Setting Up Your NPM Organization

Create an organization on [NPM](https://www.npmjs.com/) using the naming convention: `@yourorganization-ph`
   - The `-ph` suffix indicates it's a Powerhouse ecosystem package to help you and others identify it from regular NPM packages. 
   - Example: `@acme-ph`

Now that you've set up your organization you've got all the right requirements to later publish your project for others to use and install on their servers. 

## 2. Building your project 

To start building your project with it's dedicated document models and editors we'll run the following command:

  ```bash
   pnpm create document-model-lib
   ```
This command will start the configuration of your powerhouse project. 

   > 💡 For experimental features, use --version [version] which allows selecting a specific branch of our document-model-boilerplate. There are --dev, --staging and --main options. Select `pnpm create document-model-lib@dev --dev` to use the latest development version. Please be aware that this version can contain bugs and experimental features that aren't fully tested.  

<details>
<summary>Reset Package Manager Cache</summary>

If you need to reset your package manager, you can run the following commands for your package manager: (npm, yarn)

```bash
npx clear-npx-cache

npm cache verify
npm cache clean --force
npm cache verify

yarn cache list
yarn cache clean --force
yarn cache list
```

</details>

### 2.1. Specifying your project details

When you are creating your own project, you will be asked to name your project. Which will also become the package name when someone else wants to install it in a cloud environment via npm. 

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

Now that you've created your powerhouse project you are ready to generate the necessary directory and file structure to add your document models.

For this purpose you can use your preferred package manager, pnpm, bun, yarn or npm with the command. 
```bash
pnpm generate
```

### 2.2. Adding Document Models, editors and unit tests

Now that you've set up your directory. 
Go ahead and add the document models you'd like to add by going throught the standard document model building flow:
1. Defining your Document Model **GraphQL Schema**
2. Defining your Document Model **Operations**
3. Generating the scaffolding code by **exporting** the Zip file from connect and **importing** it into your project.
4. Implementing the **reducer code** and unit tests of your document models reducers.
5. Implementing the **document editors** to visualize and interact with your document models.
6. Run **unit tests** and verify the editor functionality via `npm run connect` for local testing.		  

### 2.3. Verifying your project
Now that we've completed our directory with the reducers, tests and editors and your project is populated with modules we'll verify the build output and see if everything is working correctly. 

Let's verify the package build output with the following command:
```bash
pnpm run build
```

This command will build the project and create a build directory with the output. The code gets optimized and minified. It optimizes the code for production and distribution so different environments can use it as a package.
```bash
pnpm run serve
```

This command will start a local server and serve the build output.

Inspect the build output and verify that the document models are working correctly.

## 3. Publishing your project

Since you've already registered your organization on npm, you can now publish your project to the npm registry. 
Log in via the command line:
```bash
npm login
```

You'll be prompted for your username, password, and email in a seperate browser window. 

Once you've logged in, you can configure your package.json for npm before publishing. 
If you're publishing a package under a scope (like @your-org/my-package), you might need to add the `publishConfig` to ensure it's public, otherwise scoped packages default to private:

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

For the actual publishing step, run the following command to publish your project to the npm registry:
```bash
npm publish
```

Optionally, if you are publishing a scoped package and you want it public, run:
```bash
npm publish --access public
```

Now let's verify that the package(s) get published in the package repository, next to pre-existing packages that you might have been publishing before. [NPM](https://www.npmjs.com/) 

## 4. Setting up your cloud environment 
### 4.1. Launching your server instance (AWS \- EC2 \- Ubuntu)

Let's have a look at how to set up Connect & Switchboard apps on a cloud server.
Ask your IT provider to get access to the AWS environment to set up a server in AWS  
Launch a new server instance for Connect and Switchboard with the specific specs that fit your project. 

The steps to create an EC2 instance:
   - Make sure your region is set eu-west-1 (Ireland)
   - Name your instance something like `cloud-server` or your project name
   - Select the Ubuntu 24.04 LTS
   - Architecture 64-bit (x86)
   - Scroll down to instance type and select t2.medium (recommended)
      - 2 vCPUs and 4 GiB of memory are recommended minimum specs
      - For larger projects or higher load, consider t2.large or t2.xlarge
   - Create a new key pair and save it in a secure location from which you can connect to your instance with the SSH client later on.
   - Configure the security group to allow inbound traffic:
      - SSH (Port 22) from your IP address
      - HTTP (Port 80) from anywhere
      - HTTPS (Port 443) from anywhere
      - Custom TCP (Port 8442) for Connect
      - Custom TCP (Port 8441) for Switchboard
   - **Launch the instance**

Now click on your instance ID which will open up a new window with the instance details. Hit the 'Connect' button to get the connection details.
Within the instance details you'll find the public IP address of your server instance. We'll use this to connect to our server instance later on.

:::warning
Make sure to keep your key pair file (.pem) secure and never share it. Without it, you won't be able to access your instance. Also, consider setting up AWS IAM roles and policies for better security management.
:::

### 4.2. Setting up your SSH connection

Once you've generated your keypairs and added them in the folder you'll set up the SSH connections from which you can start the process. 

SSH, which stands for **Secure Shell**, is a cryptographic network protocol used to securely access and manage devices over an unsecured network. It provides a secure channel over an unsecured network by using encryption, ensuring that data transmitted between your computer and the server remains confidential and tamper-proof.

To establish an SSH connection, you'll typically use an SSH client. On Unix-like systems (Linux, macOS), the SSH client is usually pre-installed.   
Follow the instructions of the AWS instance you've configured with Ubuntu and set up your connection by adding the necessary commands in your terminal.

![Setting up your SSH connection](images/SSHConnection.png)

Your ubuntu instance is usually always a little out of date. So use the following commands to get it up to speed. 

   ```bash
   sudo apt update && sudo apt upgrade
   ```

### 4.3. Installing the required software with a script

Now that we've connected to our ubuntu instance we'll need to install the necessary services on our server to get things going, such as Nvm, Node, NPM etc. 

For this, our team has set up a small script that will help you to automate a series of installations.  

Base command, which will start installing the necessary services on your server by downloading the install script and running it directly in the bash shell for exectuion. 

   ```bash
   curl -o- https://raw.githubusercontent.com/powerhouse-inc/powerhouse/refs/heads/main/packages/ph-cli/scripts/setup.sh | bash
   ```

The script contains the following commands and will help you set up a series of services on your server.

- **NVM**: Node Version Manager for managing Node.js versions
- **Node.js**: JavaScript runtime
- **PM2**: Process manager for Node.js applications
- **ph-cmd**: Powerhouse CLI tool for managing projects. 
- **pnpm**: Fast, disk space efficient package manager

:::info
ph-cmd is a tool that helps you manage your powerhouse projects. It's a command line interface package that you can install globally on your server and personal machine. 
It gives you access to a series of powerful commands to create or manage your projects, start or stop your services, install your project on a server instance, etc.
:::

Lets have a look at the other commands that are part of the script that will help you install the necessary services on your server. 

   #### 1. Load NVM into the current shell session
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
   ```

   #### 2. Checks if the file nvm.sh exists and loads it if the condition is true.
   ```bash
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  
   ```
   #### 3. Loading & Verifying NVM
   ```bash
   nvm --version
   ```

   #### 4. Install Node.js by using NVM
   ```bash
   nvm install 22
   ```

   #### 5. Install pnpm package manager globally
   ```bash
   npm install -g pnpm
   pnpm setup
   source $HOME/.bashrc
   ```

   #### 6. Install Powerhouse CLI 'globally' using PNPM, making it available for command-line use anywhere. Not just in the project directory locally.

   ```bash
   pnpm install -g ph-cmd
   ```

## 5. Deploying the host apps & project. 

Now that we've installed all the necessary services on our server instance, we can start deploying the host apps & our packaged project from npm.

1. **Install your project package** we've published earlier on npm now on the server instance.
	   ```bash
	   ph install @your-org/package-name
	   ```

3. **Start the Connect service** so we can start interacting with our project.
	```bash
	ph connect --https --port 8442
	```
	Let's verify that the connect service is running. Since we can't make use of the local host and we're running the connect service on the server instance we'll need to use the public IP address of our server instance to start interacting with our project. Copy the public IP address of your server instance and paste it into your browser. Now add the port `:8442` to the end of the URL and you should see your project running.

   Create a new document and start interacting with it. Add a new item to the list so you can query the document through the graphQL playground in switchboard in the next step.

2. **Start the Switchboard service** and run the following command to boot the reactor
	```bash
	ph switchboard --port 8441
	```
	Let's verify that the reactor has detected your project and is ready to start by navigating to the graphQL playground.
   Since we can't make use of the local host and we're running the switchboard service on the server instance we'll need to use the public IP address of our server instance to start interacting with our project. Copy the public IP address of your server instance and paste it into your browser. Now add the port `:8441` to the end of the URL and you should get access to the graphQL playground.


## 6. Setup the host apps as system services

Now that we've installed the host apps and our project on the server instance, we can start the services as system services. This will allow us to start the services on boot and keep them running even after a reboot.
For this we'll use the `pnpm service-startup` command which will start the services as system services.

   First, let's make sure we are in the global directory of our server instance.
   ```bash
   cd .ph
   ```
   Now we can add the host apps as system services with the following commands:
   ```bash
   pnpm service-startup 
   ```
   This will start the connect service as a system service, making use of the `pm2` process manager.

   Let's move back to our root directory with `cd ..` and run the following command to start the connect service:

   ```bash
   ph service start connect
   ```
   And do the same for the switchboard service:
   ```bash
   ph service start switchboard
   ```

## 7. Verify your project is running on your server

- Open up the server domain in your browser and you should see your project running.
- Verify that synchronization is working and your document is available. 
- Try to make a change to your document and see if it's reflected in another instance with that same document.
- Query the document through the graphQL playground

Congratulations! You've now published your project and are ready to start collaborating with your team on the same document models and editors!