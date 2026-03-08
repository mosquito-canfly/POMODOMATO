
  # Redesign Pomodoro Timer UI
  
  A modern, beautifully redesigned Pomodoro Timer UI built with React, Vite, and premium UI components. This project provides an enhanced productivity experience with a sleek, contemporary interface.
  
  The original design concept is available at [Figma](https://www.figma.com/design/OSsXb4TQFLpEXhO0UP6NFS/Redesign-Pomodoro-Timer-UI).
  
  ## Features
  
  - Modern, responsive Pomodoro Timer interface
  - Premium UI components built with Radix UI and shadcn/ui
  - Dark mode support with next-themes
  - Smooth animations using Framer Motion
  - Built with React 18 and Vite for optimal performance
  
  ## Prerequisites
  
  Before running this project, ensure you have the following installed:
  
  - **Node.js** (v18 or higher recommended)
  - **npm** (comes with Node.js)
  
  You can check if Node.js is installed by running:
  ```bash
  node --version
  npm --version
  ```
  
  If not installed, download it from [nodejs.org](https://nodejs.org/).
  
  ## Installation
  
  1. **Clone the repository**
     ```bash
     git clone <your-repository-url>
     cd Pomodomato
     ```
  
  2. **Install dependencies**
     ```bash
     npm install
     ```
  
     This will install all required packages including:
     - React and React DOM
     - Vite (build tool)
     - Radix UI components
     - Tailwind CSS
     - And other dependencies listed in package.json
  
  ## Running the Project
  
  ### Development Mode
  
  Start the development server with hot module replacement:
  
  ```bash
  npm run dev
  ```
  
  The application will be available at `http://localhost:5173/`
  
  The server will automatically reload when you make changes to the source code.
  
  ### Production Build
  
  To create an optimized production build:
  
  ```bash
  npm run build
  ```
  
  The built files will be in the `dist` directory.
  
  ## Available Scripts
  
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  
  ## Project Structure
  
  ```
  Pomodomato/
  ├── src/
  │   ├── app/
  │   │   ├── App.tsx          # Main application component
  │   │   └── components/      # Reusable UI components
  │   │       ├── figma/       # Figma-specific components
  │   │       └── ui/          # Base UI components
  │   ├── assets/              # Static assets
  │   ├── imports/             # Import configurations
  │   └── styles/              # Global styles
  ├── public/                  # Public assets
  ├── index.html              # Entry HTML file
  ├── package.json            # Project dependencies
  └── vite.config.ts          # Vite configuration
  ```
  
  ## Technologies Used
  
  - **React 18.3.1** - UI library
  - **Vite 6.4.1** - Build tool and dev server
  - **TypeScript** - Type safety
  - **Tailwind CSS 4.1.12** - Utility-first CSS framework
  - **Radix UI** - Accessible component primitives
  - **shadcn/ui** - High-quality component library
  - **Framer Motion** - Animation library
  - **Lucide React** - Icon library
  
  ## Troubleshooting
  
  ### Dependencies Issues
  
  If you encounter issues with dependencies:
  
  1. Delete `node_modules` folder and `package-lock.json`:
     ```bash
     rm -rf node_modules package-lock.json
     ```
  
  2. Reinstall dependencies:
     ```bash
     npm install
     ```
  
  ### Port Already in Use
  
  If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.). The server will display the actual URL in the terminal.
  
  ### Build Errors
  
  If you encounter build errors, ensure:
  - Node.js version is 18 or higher
  - All dependencies are properly installed
  - No syntax errors in your code
  
  ## Contributing
  
  Contributions are welcome! Please feel free to submit issues or pull requests.
  
  ## License
  
  This project is private and licensed under the terms specified in your repository.
  
  ## Acknowledgments
  
  - Original design concept from [Figma](https://www.figma.com/design/OSsXb4TQFLpEXhO0UP6NFS/Redesign-Pomodoro-Timer-UI)
  - Built with open-source technologies and community tools  