# Welcome to My Personal Website Project

This repository houses the code for my personal website, available at [ugoi.vercel.app](https://ugoi.vercel.app). Built with React, TypeScript, and Vite, this project showcases my capabilities in web development, and serves as a platform for visitors to connect with me directly.

## Features

- **Live Chat**: Engage with me in real-time through the website's chat feature. Whether you have questions, feedback, or just want to say hi, I'm here to chat.
- **Portfolio**: Explore my best projects, detailing the work I've done and the technologies I've used. It's a comprehensive look at what I can do.
- **About Page**: Learn more about me, my skills, and my professional journey. This section provides deeper insights into who I am and what I do.
- **Home**: The starting point of the website, where you can navigate to different sections including the chat, portfolio, and about page.

## Technical Overview

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules for code quality.

### Official Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utilizes [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Leverages [SWC](https://swc.rs/) for Fast Refresh.

### Expanding the ESLint Configuration

For production applications, consider enhancing your ESLint configuration for type safety and code quality:

1. **Parser Options**: Configure the top-level `parserOptions` to support the latest ECMAScript standards and TypeScript projects.

    ```js
    export default {
      // other rules...
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    }
    ```

2. **TypeScript Rules**: Replace `plugin:@typescript-eslint/recommended` with type-aware rules for stricter type checking.

3. **React Plugin**: Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and configure it to enforce React best practices.

By visiting my website, you'll get a firsthand look at my work and the opportunity to connect directly with me. I look forward to interacting with you!

