**Live Demo:** [roomers.space](https://roomers.space)

This is a **Next.js** application built with React, Firebase, and various libraries to facilitate user authentication, form handling, styling, and more. It aims to provide a platform for users to share and find rental reviews.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Scripts](#scripts)
4. [Dependencies](#dependencies)
5. [Folder Structure](#folder-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Next.js 14** for server-side rendering and routing
- **Firebase** (v10.14.0) for authentication and Firestore as database
- **React-Bootstrap** for component styling
- **Formik & Yup** for form handling and validation
- **Styled Components** for scoped CSS
- **React Dropzone** for drag-and-drop file uploads
- **React Icons** for a wide variety of icon sets
- **SASS** for modular and enhanced styling

---

## Getting Started

### Prerequisites

- **Node.js 16+** or higher (LTS recommended)
- **npm** or **yarn** installed

Make sure you have a Firebase project set up, with your credentials stored in an appropriate configuration (e.g., `firebaseConfig.js` or `.env` file).

### Installation

1. **Clone** the repository:

   ```bash
   git clone https://github.com/your-username/roomers-front.git
   ```

2. **Navigate** to the project folder:

   ```bash
   cd roomers-front
   ```

3. **Install** dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn
   ```

4. **Configure Firebase:**  
   Add your Firebase config in `firebase/firebaseConfig.js` or wherever it's imported in your project.

### Running Locally

After installing dependencies:

```bash
npm run dev
```

This starts the development server at [http://localhost:3000](http://localhost:3000).  
Any changes you make automatically rebuild and refresh the browser.

---

## Scripts

The following scripts are defined in your `package.json`:

- **`npm run dev`** – Start the development server (with hot reloading).
- **`npm run build`** – Build the production-optimized bundles.
- **`npm run start`** – Start the production build.
- **`npm run lint`** – Run ESLint checks to maintain code quality.

---

## Dependencies

Key dependencies in this project include:

- **Next.js 14.2.12** – React framework for server-rendered apps.
- **React 18** – Core UI library.
- **Firebase 10.14.0** – Authentication, Firestore, etc.
- **Bootstrap 5.3.3 / React-Bootstrap 2.10.4** – UI components and styling.
- **Formik 2.4.6** / **Yup 1.4.0** – Form validation.
- **Sass 1.79.2** – Enhanced styling.
- **Styled-Components 6.1.13** – Scoped CSS styling.

For a full list of dependencies and devDependencies, see [package.json](./package.json).

---

## Contributing

1. **Fork** the repository.
2. **Create** a new branch: `git checkout -b feature/my-feature`.
3. **Commit** your changes: `git commit -m 'Add some feature'`.
4. **Push** to the branch: `git push origin feature/my-feature`.
5. Submit a **Pull Request**.

---

### Live Demo

Visit **[roomers.space](https://roomers.space)** to see the application in action.

Enjoy building with **Next.js** and **Firebase**! If you have questions or feedback, feel free to open an issue.
