# Project Setup and Deployment Instructions

## Development Setup

### 1. Pull Repository
Clone or pull the latest version of the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

Or if you already have the repository:

```bash
git pull origin main
```

### 2. Install Dependencies
Install all required npm packages:

```bash
npm install
```

**Note:** If you encounter dependency conflicts or peer dependency warnings, you can use:
```bash
npm install --force
```

### 3. Start Development Server
Launch the NestJS realtime application in development mode:

```bash
nest start realtime
```

This command will:
- Start the NestJS application
- Run in development mode with basic logging
- Default port is typically `3000` (check your configuration)

**Development with Watch Mode:**
For automatic restart on file changes:
```bash
nest start realtime --watch
```

**Development with Debug Mode:**
To enable debugging:
```bash
nest start realtime --debug
```

---

## Production Build

### 1. Build for Production
Compile the realtime application for production:

```bash
nest build realtime
```

This command will:
- Compile TypeScript to JavaScript
- Apply production optimizations
- Generate output in the `dist/apps/realtime/` directory
- Create the compiled `main.js` entry point

The build process uses the NestJS CLI to transpile and bundle your application.

### 2. Deploy Build Files
After the build completes successfully:

1. Locate the compiled output file at:
   ```
   dist/apps/realtime/main.js
   ```

2. Copy the `main.js` file to:
   ```
   /production/main.js
   ```

3. **Prerequisites before running:**
   - Ensure Angular build is present in `/production/public/`
   - Install Redis using the provided `redis.msi` installer
   - Install Python and its dependencies:
     ```bash
     pip install -r requirements.txt
     ```

4. **Configure Environment Settings:**
   
   Edit the environment configuration file:
   ```
   /production/.env.production
   ```
   
   Update the server IP and ports according to your deployment environment:
   - **Local:** For local development/testing
   - **Tech:** For technical/staging environment
   - **Com:** For production/commercial environment
   
   **Important:** Make sure to configure the correct IP addresses and port numbers before running the application.

5. Run the application by executing:
   ```
   run.bat
   ```

---

## Common Issues

- **Port already in use:** Check if another process is using the default port (3000) and kill it or configure a different port
- **Build errors:** Clear the NestJS cache with `nest build realtime --clean` or clear npm cache with `npm cache clean --force`
- **Module not found:** Ensure all dependencies are installed with `npm install`
- **Production errors:** Make sure `node_modules` are present on the production server or run `npm install --production`