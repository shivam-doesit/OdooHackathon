# Frontend Project Documentation

## Overview

This project is a frontend application built with React and TypeScript. It is designed to work in conjunction with a backend API, providing a user interface for interacting with the application's features.

## Getting Started

To get started with the frontend application, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd project/frontend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then, run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

3. **Run the Application**
   You can start the development server with:
   ```bash
   npm start
   ```
   This will launch the application in your default web browser at `http://localhost:3000`.

## Project Structure

The frontend project has the following structure:

- `src/`
  - `components/` - Contains reusable UI components.
    - `UI/` - Contains UI components like `LoadingSpinner.tsx`.
  - `App.tsx` - The main application component.
  - `index.tsx` - The entry point for the React application.

## Components

### LoadingSpinner

The `LoadingSpinner` component is a customizable loading indicator that can be used throughout the application. It accepts the following props:

- `size` (optional): Determines the size of the spinner. Acceptable values are `'sm'`, `'md'`, and `'lg'`.
- `className` (optional): Additional CSS classes to apply to the spinner.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.