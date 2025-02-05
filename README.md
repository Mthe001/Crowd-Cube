# CrowdCube 

CrowdCube is a modern web application template built with **React** and **Vite**, designed to help you get started with creating dynamic, responsive web apps. This template provides a minimal and optimized setup that includes **Hot Module Replacement (HMR)** for fast development, integrated **ESLint** for consistent code style, and modern libraries to enhance your app's UI and animation features.

This template is perfect for building fast, scalable web applications with React, leveraging the power of Vite as the bundler and developer server, and features like **Tailwind CSS**, **React Simple Typewriter**, and **React Awesome Reveal** for enhanced styling and animations.

---

## Features

- **Fast Refresh** using React, enabled by either:
  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) (Babel-based)
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (SWC-based, faster alternative)
  
- Integrated **ESLint** for maintaining code quality and consistency, with automatic linting support.

- **Vite** for fast builds and optimized production performance, including support for TypeScript and JSX syntax.

- **React** for building interactive and dynamic UIs with component-based architecture.

- Example **Contact Page** with **sweetalert2** integration for form submission notifications:
  - Display an alert when the user attempts to send a message.
  - Shows a success notification after the message is submitted.

- **Tailwind CSS** for utility-first styling and responsive design:
  - Easily customizable theme using the `tailwind.config.js` file.
  - Full control over layout, typography, colors, and spacing without writing custom CSS.
  - Built-in support for responsive breakpoints, dark mode, and hover states.

- **React Simple Typewriter** for adding typewriter-style text animations:
  - Animates text with customizable speed and looping behavior.
  - Adds a fun and interactive effect to the UI, perfect for headings or important announcements.
  - Allows you to define multiple words or sentences to be typed one after the other.

- **React Awesome Reveal** for smooth reveal animations on scroll:
  - Adds entrance animations to elements when they scroll into view (e.g., fade-ins, slides, zoom effects).
  - Configurable animation triggers based on scroll position, with smooth transition effects.

- **React Router** for page navigation and routing between components:
  - Supports multiple pages with dynamic URL paths.
  - Includes configuration for easy navigation between homepage, about page, contact page, and more.

- **Dark Mode Support** with **Tailwind CSS**:
  - Seamlessly switch between light and dark themes using Tailwind’s built-in classes.
  - Automatically adjusts the color scheme based on the system preference or user toggle.

- **Responsive Design**:
  - Mobile-first design ensures that the layout and components adjust automatically for different screen sizes.
  - Fully functional on tablets, mobile devices, and desktops, thanks to Tailwind CSS's responsive utilities.

- **SVG Icons** using libraries like **react-icons**:
  - Includes scalable vector icons from popular libraries (e.g., FontAwesome, Material Icons) that can be used anywhere in your app.
  - Easy to customize icon size, color, and animation properties.

- **Form Validation (optional)** using **React Hook Form**:
  - Easy-to-use form validation setup for dynamic forms.
  - Simplifies managing form data, validation, and submission handling.

- **Modern Web Development Tools**:
  - **ESLint** for code linting and style consistency.
  - **Prettier** for auto-formatting code according to a standardized style.
  - **Husky** for running scripts before committing code (e.g., linting or formatting).
  
- **Optimized Image Handling**:
  - Built-in image optimization with Vite’s image imports to ensure fast load times for your app’s assets.
  - Automatic image resizing and format conversion for different devices.

- **Backend Integration with MongoDB and Express.js**:
  - **Node.js / Express.js** backend for handling server-side operations and API requests.
  - **REST API** for interacting with the frontend and performing CRUD operations with MongoDB.
  - **Axios** is included for making API requests from the frontend to the backend (e.g., for submitting contact form data).
  - **MongoDB** integration for storing form data, user information, and other application data in the cloud.
  - Example: When users submit the contact form, the data can be sent to the backend server, where it is saved to MongoDB and optionally an email is sent to notify the team.
  - **Mongoose** is used to model MongoDB data for easier querying and schema validation.
  
  ### Backend Example:
  When a user submits the contact form, the form data (e.g., name, email, subject, message) is sent to an Express.js API endpoint that:
  1. Saves the form data into a MongoDB collection.
  2. Optionally sends an email notification to the admin using **Nodemailer** or similar libraries.
  
  **Steps to Integrate Backend**:
  1. Set up a Node.js backend with Express.js.
  2. Connect your backend to a MongoDB database using Mongoose.
  3. Create a contact form route to handle incoming form submissions from the frontend.
  4. Use Axios to make a `POST` request to the backend API with the form data.
  5. On the backend, handle the incoming request, save the data to MongoDB, and send a response to the frontend.
  
  ### Example Express Route:
  ```js
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const nodemailer = require('nodemailer'); // Optional: for email notifications
  const router = express.Router();
  
  // Contact form model
  const ContactForm = mongoose.model('ContactForm', new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
  }));
  
  // POST endpoint to handle form submission
  router.post('/submit-form', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Save form data to MongoDB
      const formSubmission = new ContactForm({ name, email, subject, message });
      await formSubmission.save();
      
      // Optional: Send email notification
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      });
      
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'admin-email@example.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      };
      
      await transporter.sendMail(mailOptions);
      
      // Respond to frontend
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong, please try again.' });
    }
  });
  
  module.exports = router;



### Benefits of Using These Features

- **Fast Development**: Thanks to **Vite** and **Hot Module Replacement (HMR)**, your development experience is fast and seamless, allowing you to instantly see changes made to the code without a full page reload.

- **Scalable Design**: **Tailwind CSS** helps you maintain a scalable, consistent design throughout the application while enabling quick changes without the need for custom CSS.

- **Typewriter Effects & Animations**: **React Simple Typewriter** and **React Awesome Reveal** allow you to add engaging animations that improve the user experience and make the website feel more interactive and lively.

- **Smooth User Experience**: By integrating **React Router** and **sweetalert2**, the app provides a smooth flow from page to page and gives users instant feedback when they submit forms.

- **Mobile-Friendly**: With **Tailwind’s responsive utilities**, the design automatically adjusts based on the device, making the app work seamlessly across desktops, tablets, and smartphones.

- **Maintainable Code**: The use of **ESLint** and **Prettier** ensures that your code remains clean, consistent, and easy to maintain in the long run, especially in larger projects.

---

This section now highlights the full set of tools and libraries used in your **CrowdCube** project and explains their benefits to users and developers working with the template. Let me know if you need further details or changes!



---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 16.8 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

Follow these steps to get your environment up and running:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/programming-hero-web-course2/b10-a10-client-side-Mthe001
    cd crowdcube
    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Run the development server:**

    To start the development server and open the app in your browser:

    ```bash
    npm run dev
    ```

    Or with yarn:

    ```bash
    yarn dev
    ```

    Your app should now be running at `http://localhost:3000`.

    Git clone server-base https://github.com/Mthe001/Crowd-Cube-Server.git

4. **View Live This Site!**

   Click here : https://assginment-10-6b155.web.app/

---



## 👤 Creator Info

👨‍💻 **Developer:** Mthe001\
📧 **Email:** [mtheredwanulhaque@gmail.com](mailto\:mtheredwanulhaque@gmail.com)\
📞 **Contact:** +8801614591672\
🔗 **GitHub:** [Mthe001](https://github.com/Mthe001)\
🔗 **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

The project structure is simple and follows the standard React + Vite setup.

