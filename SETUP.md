# Setup Guide for Image Resizer

## Prerequisites Installation

Before running this project, you need to install Node.js and npm.

### Installing Node.js and npm

#### Option 1: Download from Official Website (Recommended)

1. **Visit the official Node.js website**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS (Long Term Support) version for Windows

2. **Install Node.js**
   - Run the downloaded installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation
   - Complete the installation

3. **Verify installation**
   - Open a new Command Prompt or PowerShell
   - Run: `node --version`
   - Run: `npm --version`
   - Both should show version numbers

#### Option 2: Using Chocolatey (Windows Package Manager)

If you have Chocolatey installed:

```bash
choco install nodejs
```

#### Option 3: Using Winget (Windows Package Manager)

```bash
winget install OpenJS.NodeJS
```

### After Installing Node.js

1. **Open a new terminal/command prompt**
   - Close and reopen your terminal to ensure PATH is updated

2. **Navigate to the project directory**
   ```bash
   cd "C:\Users\Ujjwal\Documents\Image Resizer"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Alternative: Quick Test Version

If you want to test the functionality immediately without Node.js, you can use the simple HTML version:

1. Open `simple-test.html` in your browser
2. This provides a basic interface for testing the concept

## Troubleshooting

### "npm is not recognized" Error
- Make sure Node.js is properly installed
- Restart your terminal/command prompt
- Check if Node.js is in your system PATH

### "node is not recognized" Error
- Reinstall Node.js and ensure "Add to PATH" is checked
- Restart your computer after installation

### Permission Errors
- Run terminal as Administrator
- Check folder permissions

### Port Already in Use
- Change the port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

## System Requirements

- **Operating System**: Windows 10/11, macOS, or Linux
- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **RAM**: At least 4GB (8GB recommended)
- **Storage**: At least 1GB free space

## Next Steps

Once Node.js is installed and the project is running:

1. **Test the application**
   - Upload an image
   - Set dimensions
   - Resize and download

2. **Deploy to Vercel**
   - Follow the deployment guide in README.md

3. **Customize the application**
   - Modify styles in `app/globals.css`
   - Add new features
   - Update the UI

## Support

If you encounter issues:

1. Check the [Node.js documentation](https://nodejs.org/en/docs/)
2. Verify your installation with `node --version` and `npm --version`
3. Check the project's README.md for more details
4. Create an issue in the project repository 