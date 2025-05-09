# Working With The Monorepo  

## **4. Distinction Between Packages and Apps**

### **Packages:**
- **Purpose:** Code meant to be reused across projects.
- **Features:**
  - Clean, readable code.
  - Easy navigation for developers.
  - Modular imports to prevent unnecessary bloat.

### **Apps:**
- **Purpose:** Deployed applications (websites, servers).
- **Features:**
  - Optimized for deployment, not code readability.
  - Bundled into minimal, performance-optimized code using **Vite**.
  - Obfuscated code to reduce file sizes and improve performance.

  ## **5. The Role of Vite in the Build Process**

### **What is Vite?**
- A bundler that compiles code for deployment, optimizing it for performance.

### **Key Changes:**
- **Separation of Concerns:**
  - Vite is used exclusively for apps, not packages.
  - Prevents unnecessary obfuscation in packages, making debugging easier.
- **Performance Gains:**
  - Smaller final bundle sizes.
  - Faster build times.
  - Reduced duplicate code in production.
