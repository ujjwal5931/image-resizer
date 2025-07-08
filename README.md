# Image Resizer

A modern, responsive web application for resizing images built with Next.js and Tailwind CSS. Upload your images and resize them to any custom dimensions with high quality.

## Features

- 🖼️ **Multiple Format Support**: Upload JPG, PNG, and WebP images
- 📏 **Custom Dimensions**: Set any width and height you want
- 🎨 **High Quality**: Uses Sharp library for professional-grade image processing
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Processing**: Optimized for quick image resizing
- 💾 **Easy Download**: One-click download of resized images
- 🔒 **File Validation**: Secure file type and size validation
- 🎯 **User-Friendly**: Clean, intuitive interface with drag-and-drop support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Image Processing**: Sharp
- **Deployment**: Vercel (optimized)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd image-resizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload Image**: Click the upload area or drag and drop an image file
2. **Set Dimensions**: Enter your desired width and height in pixels
3. **Resize**: Click the "Resize Image" button
4. **Download**: Once processed, click "Download Resized Image"

## API Endpoints

### POST /api/resize

Resizes an uploaded image to specified dimensions.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `image`: Image file (JPG, PNG, WebP, max 10MB)
  - `width`: Target width in pixels
  - `height`: Target height in pixels

**Response:**
- Success: Resized image as JPEG file
- Error: JSON with error message

## Deployment on Vercel

### Step 1: Prepare Your Project

1. **Ensure your project is ready**
   - All dependencies are in `package.json`
   - Build script works locally (`npm run build`)
   - No environment variables needed for basic functionality

2. **Optimize for Vercel**
   - The project is already optimized for Vercel deployment
   - Uses Next.js App Router
   - Sharp library is compatible with Vercel's serverless functions

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Confirm deployment settings
   - Wait for deployment to complete

#### Option B: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Configure project settings (usually auto-detected)
   - Click "Deploy"

### Step 3: Verify Deployment

1. **Check the deployment**
   - Vercel will provide a URL (e.g., `https://your-project.vercel.app`)
   - Test the image resizing functionality
   - Verify all features work correctly

2. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project
   - Navigate to "Settings" → "Domains"
   - Add your custom domain
   - Configure DNS settings as instructed

## Environment Variables

No environment variables are required for basic functionality. The application works out-of-the-box.

## File Structure

```
image-resizer/
├── app/
│   ├── api/
│   │   └── resize/
│   │       └── route.ts          # API endpoint for image resizing
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main homepage component
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Performance Optimizations

- **Sharp Library**: High-performance image processing
- **Next.js Optimization**: Built-in performance optimizations
- **Responsive Images**: Optimized image loading
- **File Size Limits**: 10MB max to prevent abuse
- **Error Handling**: Comprehensive error handling and user feedback

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/image-resizer/issues) page
2. Create a new issue with detailed information
3. Include browser version, error messages, and steps to reproduce

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Sharp](https://sharp.pixelplumbing.com/) for high-performance image processing
- [Vercel](https://vercel.com/) for seamless deployment 