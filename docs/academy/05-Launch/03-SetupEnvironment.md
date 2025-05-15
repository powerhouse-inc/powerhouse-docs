# Powerhouse Setup Guide

## Introduction
Powerhouse is a powerful platform that helps you manage and deploy your applications efficiently. This guide will walk you through the process of setting up both the Powerhouse CLI and configuring your server machine to run Powerhouse services. Whether you're setting up a development environment or preparing for production deployment, this guide provides all the necessary steps and considerations.

## Prerequisites
Before you begin, ensure you have a Linux-based system (Ubuntu or Debian recommended), sudo privileges, and a stable internet connection. These are essential for the installation and configuration process. The system should have at least 1GB of RAM and 10GB of free disk space for optimal performance. While these are minimum requirements, more resources will provide better performance, especially when running multiple services.

## 1. Installing Powerhouse CLI

The `install-tools.sh` script provides a streamlined way to install the Powerhouse CLI tool and all its necessary dependencies. This script handles the installation of node.js 22, pnpm, and the Powerhouse CLI itself. It's designed to work across different Linux distributions, though it's optimized for Ubuntu and Debian-based systems.

### Installation Steps:
1. Download the setup script:
```bash
curl -O https://raw.githubusercontent.com/powerhouse-inc/powerhouse/refs/heads/main/scripts/install-tools.sh
```

2. Make the script executable:
```bash
chmod +x install-tools.sh
```

3. Run the script:
```bash
./install-tools.sh
```

4. Choose a version when prompted:
   - `dev`: Development version - Use this for testing new features or development work
   - `staging`: Staging version - Use this for pre-production testing
   - RECOMMENDED: `latest`: Latest stable version - Recommended for production environments
   - Press Enter to go ahead with the latest version

5. After installation, source your shell configuration:
```bash
source ~/.bashrc  # or source ~/.zshrc if using zsh
```

6. Verify the installation:
```bash
ph --version
```

## 2. Configuring Your Machine

Download the setup script:
```bash
curl -O  https://raw.githubusercontent.com/powerhouse-inc/powerhouse/refs/heads/main/scripts/setup-environment.sh
```

The `setup-environment.sh` script is a comprehensive tool that prepares your machine for running Powerhouse services. It handles everything from package installation to service configuration, making the setup process straightforward and automated. This script is particularly useful for setting up new servers or reconfiguring existing ones.

### Configuration Steps:

1. Make the script executable:
```bash
chmod +x setup-environment.sh
```

2. Run the script:
```bash
./setup-environment.sh
```

3. Follow the interactive prompts:

### Step 1: Package Installation
During the package installation phase, you'll be prompted to enter package names that you want to install. For example, you might want to install `@sky-ph/atlas` or other Powerhouse packages. This step is crucial for adding the specific functionality you need to your Powerhouse installation. You can press Enter to skip this step if you don't need to install any packages immediately, but you can always install packages later using the `ph install` command.

### Step 2: Database Configuration
The script offers two options for database configuration. 

**Option 1:** Sets up a local PostgreSQL database, which is ideal for development or small deployments. It automatically creates a database user with a secure random password and configures the database to accept local connections. This option is perfect for getting started quickly or for development environments. 

**Option 2:** Allows you to connect to a remote PostgreSQL database by providing a connection URL in the format `postgres://user:password@host:port/db`. This is recommended for production environments where you might want to use a managed database service or a dedicated database server.

### Step 3: SSL Configuration
For SSL configuration, you have two choices. 

**Option 1:** The **Let's Encrypt** option is recommended for production environments. It requires you to provide a base domain (like `powerhouse.xyz`) and optional subdomains for your services. The script will automatically obtain and configure SSL certificates for your domains, ensuring secure communication between your services and clients. 

**Option 2:** The self-signed certificate option is suitable for development or testing environments. It uses your machine's hostname and generates a self-signed certificate, configuring the services with appropriate base paths. While this option is convenient for development, browsers will show security warnings, which is why it's not recommended for production use.

<details>
<summary>Setting up a domain in DigitalOcean</summary>

1. **Navigate to Networking:**
   - Go to the DigitalOcean Control Panel and select "Networking" from the sidebar.

2. **Select Your Project:**
   - Choose the relevant project (e.g., `firstproject`).

3. **Add a Domain:**
   - Enter your domain name (e.g., `powerhouse.web3.berlin`) and add it to your project if you haven't already.

4. **Create DNS Records:**
   - Under the "Create new record" section, add the required DNS records:
     - **A Record:**
       - Hostname: `@` or subdomain (e.g., `connect` or `switchboard`)
       - Will Direct To: Your server's public IP address (e.g., `209.38.216.121`)
       - TTL: Default (e.g., `3600` seconds)
     - **NS Records:**
       - Provided by DigitalOcean (e.g., `ns1.digitalocean.com`, `ns2.digitalocean.com`, `ns3.digitalocean.com`).
       - Ensure these are set at your domain registrar if DigitalOcean is not your registrar.

5. **Verify DNS Propagation:**
   - Use tools like `dig` or online DNS checkers to confirm your records are live.

6. **Update Nameservers (if needed):**
   - If your domain is registered elsewhere, update the nameservers to point to DigitalOcean's NS records.

7. **Wait for Propagation:**
   - DNS changes may take some time (up to 48 hours) to propagate globally.

<!-- Placeholder: Add screenshots or more detailed steps as needed for your specific setup. -->

</details>

<details>
<summary>Setting up a domain with AWS EC2</summary>

## Assigning a Static IP to EC2 Instance

To assign a custom static IP to an Amazon EC2 Ubuntu instance, you'll use Elastic IPs. This process involves three main steps:

### 1. Allocate Elastic IP

1. Navigate to the EC2 service in the AWS console
2. Choose "Elastic IPs" from the navigation pane on the left
3. Select "Allocate new address"
4. Select the VPC where your EC2 instance is located
5. Click "Allocate"

### 2. Associate Elastic IP

1. Go back to the EC2 console and select your instance
2. From the "Networking" tab, expand "Network interfaces"
3. Note the "Interface ID" of the network interface
4. Select the "Interface ID" to manage its IP addresses
5. Choose "Actions", then "Manage IP Addresses"
6. Find the Elastic IP you allocated and click "Associate"

### 3. Configure DNS (Optional, for Custom Domains)

To configure your domain to point to your EC2 instance, you'll need to create an 'A' record with your DNS provider. Here's how to do it:

1. **Access DNS Management:**
   - Log in to your domain registrar or DNS hosting provider
   - Navigate to DNS management section (may be called "DNS Records," "Zone File Editor," etc.)
   - Select your domain

2. **Create A Record:**
   - Click "Add Record" or similar button
   - Configure the following:
     - **Type**: A (maps hostname to IPv4 address)
     - **Host/Name**: 
       - For root domain: Use @ or leave blank
       - For subdomain: Enter subdomain name (e.g., www)
     - **Value**: Your Elastic IP address
     - **TTL**: Leave as default (usually 1 hour)

3. **Example Configuration:**
   For domain `mydomain.com` and Elastic IP `54.123.45.67`:
   ```
   Root Domain (@):
   Type: A
   Host: @
   Value: 54.123.45.67

   Subdomain (www):
   Type: A
   Host: www
   Value: 54.123.45.67
   ```

4. **Verify Configuration:**
   - Save the DNS record
   - Wait for DNS propagation (typically 15-30 minutes)
   - Use tools like whatsmydns.net to verify the changes

### 4. Configure Subdomains

Adding subdomains (like `connect.yourdomain.com` or `switchboard.yourdomain.com`) follows a similar process to the main domain setup. You can point subdomains to either the same EC2 instance as your main domain or to different instances.

#### Same EC2 Instance
If your subdomain will be served by the same EC2 instance as your main domain:

1. **Create A Record:**
   - Type: A
   - Host/Name: Your subdomain name (e.g., `blog` for `blog.yourdomain.com`)
   - Value: Same Elastic IP as your main domain
   - TTL: Default (usually 1 hour)

2. **Configure Web Server:**
   - Set up virtual hosts in your web server (Nginx/Apache)
   - Configure the server to serve different content based on the subdomain

3. **Verify Setup:**
   - Wait for DNS propagation
   - Test subdomain accessibility
   - Verify web server configuration

### Troubleshooting DNS and SSL Issues

If you encounter SSL certificate issues during setup, it's often related to DNS configuration. Here's how to prevent and resolve these issues:

#### Prevention Steps

1. **Set Up DNS First:**
   - Create A records for all subdomains before running the setup script
   - Point them to your EC2 instance's public IP address
   - Wait for DNS propagation before requesting SSL certificates

2. **Handle Temporary Certificates:**
   - Ensure temporary certificates aren't deleted before Nginx reload
   - Check `/etc/nginx/ssl/` for temporary certificate presence
   - If missing, rerun the SSL setup process

3. **Verify DNS Configuration:**
   - Check your subdomain A records with:
     ```bash
     dig +short your-subdomain.yourdomain.com
     ```
   - The output should match your EC2 instance's public IP
   - If not, update your DNS records and wait for propagation

4. **Rerun SSL Setup:**
   - After DNS propagation is complete
   - Run the SSL setup or Certbot command again
   - This will obtain proper SSL certificates for your domains

### Important Considerations

#### Billing
- Elastic IPs are billed hourly
- You'll only be charged for the time an Elastic IP is associated with an instance or while it's allocated but not associated

#### IP Address Types
- **Public IP**: Elastic IPs are public IP addresses, accessible over the internet
- **Private IP**: You can still use a private IP for internal communication within your VPC

If you're using a custom domain, ensure your security groups allow traffic to your EC2 instance from anywhere (0.0.0.0/0) on the appropriate ports.

</details>

### Step 4: Service Configuration

The script takes care of all the necessary service configuration automatically. It installs and configures **Nginx** as a reverse proxy, sets up SSL certificates, and configures the proxy settings for optimal performance. It also installs **PM2** for process management and starts your services with the appropriate configuration based on your SSL choice. The Nginx configuration includes optimizations for **WebSocket connections**, static file serving, and security headers. PM2 is configured to automatically restart services if they crash and to start them on system boot.

### Step 5: Security Features
Security is a top priority in the setup process. The script implements automatic SSL certificate management, generates secure database passwords, and configures security headers in Nginx. It also sets up proper proxy settings to support WebSocket connections securely. The security headers include protection against common web vulnerabilities, and the SSL configuration uses modern cipher suites and protocols. The script also ensures that sensitive files and directories have appropriate permissions.


## 3. Verifying the Setup

After the installation is complete, it's important to verify that everything is working correctly. You can check the status of your services using PM2, verify the Nginx configuration, and ensure your SSL certificates are properly installed. This step is crucial for identifying any potential issues before they affect your users.

1. Check service status:
```bash
pm2 status
```

2. View Nginx configuration:
```bash
sudo nginx -t
```

3. Check SSL certificates:
```bash
sudo certbot certificates  # if using Let's Encrypt
```

## 4. Accessing Services

Once everything is set up, you can access your services through the configured domains. If you chose Let's Encrypt, your services will be available at their respective subdomains. With a self-signed certificate, you'll access the services through your machine's hostname with the appropriate base paths. The services are configured to use HTTPS by default, ensuring secure communication.

### With Let's Encrypt:
- Connect: `https://connect.yourdomain.com`
- Switchboard: `https://switchboard.yourdomain.com`

### With Self-signed Certificate:
- Connect: `https://your-hostname/connect`
- Switchboard: `https://your-hostname/switchboard`

## 5. Troubleshooting

When issues arise, there are several common problems you might encounter. 
- The "ph: command not found" error usually means you need to source your shell configuration file. 
- Nginx configuration errors can be investigated through the error logs, and service issues can be diagnosed using PM2 logs. 
- SSL certificate problems often relate to DNS settings or certificate paths. Understanding these common issues and their solutions will help you maintain a stable Powerhouse installation.

### Common Issues:
1. **"ph: command not found"**
   - Run `source ~/.bashrc` or restart your terminal
   - Verify that the PNPM_HOME environment variable is set correctly
   - Check if the ph binary exists in the PNPM_HOME directory

2. **Nginx configuration errors**
   - Check logs: `sudo tail -f /var/log/nginx/error.log`
   - Verify that all required modules are installed
   - Ensure that the SSL certificate paths are correct

3. **Service not starting**
   - Check PM2 logs: `pm2 logs`
   - Verify that the service ports are not in use
   - Check if the service has the required permissions

4. **SSL certificate issues**
   - Verify domain DNS settings
   - Check certificate paths in Nginx config
   - Ensure that the certificate files are readable by Nginx

## 6. Maintenance

Regular maintenance is crucial for keeping your Powerhouse installation running smoothly. You can update services using the Powerhouse CLI, restart services through PM2, and monitor logs to ensure everything is functioning correctly. Regular maintenance helps prevent issues and ensures that your services are running with the latest security patches and features.

### Updating Services:
```bash
ph update <package-name>
```

### Restarting Services:
```bash
pm2 restart all
```

### Viewing Logs:
```bash
pm2 logs
```

## 7. Security Notes

Maintaining security is an ongoing process. It's essential to keep your database credentials secure and regularly update your SSL certificates. Regular monitoring of system logs helps identify potential security issues, and keeping your system and packages updated ensures you have the latest security patches. Consider implementing additional security measures such as firewall rules, intrusion detection systems, and regular security audits.

## 8. Backup

Regular backups are crucial for data safety. The database can be backed up using pg_dump, and your configuration files can be archived using tar. These backups should be stored securely and tested regularly to ensure they can be restored if needed. Consider implementing an automated backup schedule and storing backups in multiple locations for redundancy.

### Database Backup:
```bash
pg_dump -U powerhouse -d powerhouse > backup.sql
```

### Configuration Backup:
```bash
sudo tar -czf powerhouse-config.tar.gz /etc/powerhouse/
```

## 9. Best Practices

To get the most out of your Powerhouse installation, follow these best practices:

1. **Regular Updates**: Keep your system, packages, and services updated to the latest stable versions.
2. **Monitoring**: Set up monitoring for your services to detect issues early.
3. **Documentation**: Keep documentation of your configuration and any customizations.
4. **Testing**: Test your backup and restore procedures regularly.
5. **Security**: Regularly review and update your security measures.

## 10. Getting Help

If you encounter issues or need assistance, there are several resources available:

1. **Documentation**: Check the official Powerhouse documentation for detailed information.
2. **Community**: Join the Powerhouse community forums or chat channels.
3. **Support**: Contact Powerhouse support for professional assistance.
4. **GitHub**: Report issues or contribute to the project on GitHub. 
