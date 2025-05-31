# Cover Letter Generator Chrome Extension

A simple and elegant Chrome extension built with React and Tailwind CSS to generate personalized cover letters using your resume and job description.

## Features

- Upload your resume (PDF format)
- Enter the company name and paste the job description
- Instantly generate a tailored cover letter using AI
- Copy the generated cover letter to your clipboard with one click
- Clean, modern UI with responsive design

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd coverletter
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your backend API base URL:
     ```
     VITE_BASE_URL='https://your-backend-url.com'
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   # or
   yarn build
   ```

### Load as Chrome Extension

1. Build the project (`npm run build`).
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the `build` folder.

## Usage

1. Click the extension icon in Chrome.
2. Upload your resume (PDF).
3. Enter the company name and paste the job description.
4. Click "Generate Cover Letter".
5. Copy the generated cover letter and use it in your application.

## Project Structure

- `src/` - React source code
- `public/manifest.json` - Chrome extension manifest
- `build/` - Production build output

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [TypeScript](https://www.typescriptlang.org/)

## License

MIT

---

**Made with ❤️ for job seekers!**