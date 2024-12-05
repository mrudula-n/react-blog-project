# My React Blog

A blog platform built with React and Vite.

## Setup Instructions
1. Clone the repository - https://github.com/mrudula-n/react-blog.git
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5173 in your browser

## Assignment 0

### Project Structure
my-blog/
├── node_modules/     # Contains all the npm packages required by the project (auto-generated, do not modify)
├── public/           # Folder for static assets like images, fonts, etc.
├── src/              # Contains all your application source code
│   ├── assets        # Stores static assets like images, icons, and other resources that are needed across the application
│   ├── components/   # Folder for reusable components (e.g., Header.jsx)
│   ├── App.css       # Contains CSS specific to the App component
│   ├── App.jsx       # Main application component that ties everything together
│   ├── main.jsx      # Application entry point where React is rendered into the DOM
│   └── index.css     # Global styles for the application
├── .gitignore        # Specifies files and directories that Git should ignore
├── eslint.config.js  # Configures ESLint, a tool that analyzes your code to find and fix issues based on coding standards
├── index.html        # The main HTML file that serves as the entry point for the React application
├── package-lock.json # Locks the exact versions of dependencies and their sub-dependencies for consistent installations
├── package.json      # Project configuration file, listing dependencies, scripts, and metadata
├── vite.config.js    # Vite configuration file for build and dev server settings
└── README.md         # Documentation for the project, including setup instructions


### Screenshot
![alt text](image.png)

### What I Learned
1. Understanding Vite
2. Setting up a React project with Vite 
3. Using reusable components

## Assignment 1

### Components Structure
- BlogPost: Individual blog post display
- BlogList: Container for multiple posts
- Header: Navigation and site title

### Styling Approach
I used **CSS Modules** for styling. This approach provides locally scoped styles, which prevents conflicts and makes each component’s styles self-contained. Each component has its own CSS Module file, keeping our styles modular and easy to maintainwithout any complexity.

### New Features
- **Individual Blog Post Display**: Display each blog post with title, author, date, read time, and content.
- **Blog Post List**: Renders multiple blog posts from an array of post data.
- **Responsive Design**: Adjusts layout and typography for different screen sizes.
- **Prop Validation**: Use `PropTypes` to enforce correct prop types for each component.

### Screenshots
#### Desktop
![alt text](image-1.png)

##### Mobile
![alt text](image-2.png)