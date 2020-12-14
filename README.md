# WebTech™ Enterprises Project

Topic (#5):
### Web app for taking notes during courses/labs

Web application project of "WebTech™ Enterprises" team, part of the WT course from ASE.

General requirements: https://drive.google.com/file/d/1X2rf4G3B-Yyw-DYNiRS5pds5i8VAVi83/view?usp=sharing

Specific requirements: https://drive.google.com/file/d/1-lQSrjP5wduiBM9CET5Pd3-Z-F4c7beL/view?usp=sharing

(@stud.ase.ro account needed)

Figma Project (work in progress): https://www.figma.com/file/FjOIB2URk3j1PDIrrmAjrz/WebTech-Enterprises-Project?node-id=0%3A1

Documentation (work in progress): https://docs.google.com/document/d/1a7NBI6Mis5Rw7BXhAUuL8b0s9LRRgOaMxAKqpOK4G-4/edit?usp=sharing

#### React app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### API Server

Pre-requisites:

MariaDB/mySQL database server running on port 3306.
A database named `webtech_enterprises` having a privileged user named `webtech_enterprises` with the password (just for dev. purposes) `echipadesoc`.

`npm install` in project directory for installing the required express, mysql2, sequelize modules.

In the /src directory, you can start the API server:

### `npx nodemon server.js`

The API requests for database communication:

### `create`
Create the required database blank tables: `GET localhost:8080/create`

### `users`
Get the full list of users: `GET localhost:8080/users`

Get a specific user: `GET localhost:8080/users/[id]`

Add a user: `POST localhost:8080/users` with a JSON body containing the record data.

Update a specific user: `PUT localhost:8080/users/[id]` with a JSON body containing the full updated record data.

#### JSON fields

username (string): required

email (string): required

password (string): required

photo (blob): optional

is_admin (boolean): required

notes (string): optional


Delete a specific user: `DELETE localhost:8080/users/[id]`

### `notes`

Same endpoints as users, but change 'users' with 'notes'

### JSON fields

title (string): required

content (string): optional

notebook (string): optional

tags (string): optional

public (boolean): required

### `groups`

Same endpoints as users, but change 'users' with 'groups'

### JSON fields

users (string): required

notes (string): optional

### React App

In the project directory, you can start the app:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
