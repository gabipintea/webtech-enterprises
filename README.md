# WebTech™ Enterprises Project

Topic (#5):
### Web app for taking notes during courses/labs

Web application project of "WebTech™ Enterprises" team, part of the Web Technologies course from ASE.

General requirements: https://drive.google.com/file/d/1X2rf4G3B-Yyw-DYNiRS5pds5i8VAVi83/view?usp=sharing

Specific requirements: https://drive.google.com/file/d/1-lQSrjP5wduiBM9CET5Pd3-Z-F4c7beL/view?usp=sharing

(@stud.ase.ro account needed)

Figma Project (work in progress): https://www.figma.com/file/FjOIB2URk3j1PDIrrmAjrz/WebTech-Enterprises-Project?node-id=0%3A1

Documentation (work in progress): https://docs.google.com/document/d/1a7NBI6Mis5Rw7BXhAUuL8b0s9LRRgOaMxAKqpOK4G-4/edit?usp=sharing


## API Server

The present API is a RESTful interface, providing programmatic access to much of the data in the application database. It provides predictable URLs for accessing resources and uses built-in HTTP features to receive commands and return responses.

This makes it easy to communicate with from a wide variety of environments, like command-line utilities, or the official application frontend (UI).
The API accepts JSON or form-encoded content in requests and returns JSON content in all of its responses, including errors. Only the UTF-8 character encoding is supported for both requests and responses.

### Pre-requisites:

MariaDB/mySQL database server running on port 3306.
A database named `webtech_enterprises` having a privileged user named `webtech_enterprises` with the password (just for dev. purposes) `echipadesoc`.

Run `npm install` in the project directory for installing the required express, mysql2, sequelize modules.

In the /src directory, you can start the API server:

Recommended command to be run:

### `npx nodemon server.js`

The API requests for database communication:

### Database creation

The following request will create the database and the required tables (users, groups, notes) with the required fields.

Create the required database blank tables: 

`GET /create`

Specific responses:

| Status | Response |
|---|---|
| 201 | message: created |

### `Users`
| Request |
| --- |
| `GET /users` |
| `GET /users/<id>` |
| `POST /users` |
| `PUT /users/<id>` |
| `DELETE /users/<id>` |

#### Get the full list of users:

`GET /users`

Specific responses:

| Status | Response |
|---|---|
| 200 | JSON formatted array, containing all the users |

#### Get a specific user:

`GET /users/<id>` with the required `id` parameter of the requested user.

Specific responses:

| Status | Response |
|---|---|
| 200 | JSON formatted object, containing the user with the parameter `id` |
| 404 | `message: not found` |

#### Add a user: 

`POST /users` with a JSON body containing the record data.

| Parameter | Description |
| --- | --- |
| username | (string - required) Unique username for a student |
| email | (string - required) Unique email addres in the @stud.ase.ro domain |
| password | (string - required) Alphanumerical password for accessing the private dashboard |
| photo | (string - optional) The link where the profile photo resides on the server |
| is_admin | (boolean - required) A true/false marker for marking the admins |
| notes | (string - optional) A string, containing the notes IDs, associated with the user, delimited by `/` |

Specific responses:

| Status | Response |
|---|---|
| 201 | `message: created` |
| 500 | `message: User creation has failed (Server error)` |
| 400 | JSON formatted array, containing all the input validation errors |

#### Update a specific user: 

`PUT /users/<id>` with the required `id` parameter of a user to be changed, and a JSON body containing the updated record data.

| Parameter | Description |
| --- | --- |
| username | (string) Unique username for a student |
| email | (string) Unique email addres in the @stud.ase.ro domain |
| password | (string) Alphanumerical password for accessing the private dashboard |
| photo | (string) The link where the profile photo resides on the server |
| is_admin | (boolean) A true/false marker for marking the admins |
| notes | (string) A string, containing the notes IDs, associated with the user, delimited by `/` |

Specific responses:

| Status | Response |
|---|---|
| 202 | `message: accepted` |
| 404 | `message: not found` |
| 400 | JSON formatted array, containing all the input validation errors |


#### Delete a specific user: 

`DELETE /users/<id>` with the required `id` parameter of a user to be deleted.

Specific responses:

| Status | Response |
|---|---|
| 202 | `message: deleted` |
| 404 | `message: not found` |

### `Notes`

| Request |
| --- |
| `GET /notes` |
| `GET /notes/<id>` |
| `POST /notes` |
| `PUT /notes/<id>` |
| `DELETE /notes/<id>` |

#### Get the full list of notes:

`GET /notes`

Specific responses:

| Status | Response |
|---|---|
| 200 | JSON formatted array, containing all the notes |

#### Get a specific note:

`GET /notes/<id>` with the required `id` parameter of the requested note.

Specific responses:

| Status | Response |
|---|---|
| 200 | JSON formatted object, containing the note with the parameter `id` |
| 404 | `message: not found` |

#### Add a note: 

`POST /notes` with a JSON body containing the record data.

| Parameter | Description |
| --- | --- |
| title | (string - required) The title of the note |
| content | (string - optional) The content in markdown format |
| notebook | (string - optional) The notebook/category where the note should be categorized |
| tags | (string - optional) A string, containing keywords, delimited by `/`, for the note to be searched for |
| public | (boolean - required) A true/false marker for marking the public/shareable permission of the note |

Specific responses:

| Status | Response |
|---|---|
| 201 | `message: created` |
| 500 | `message: Note creation has failed (Server error)` |
| 400 | JSON formatted array, containing all the input validation errors |

#### Update a specific note: 

`PUT /notes/<id>` with the required `id` parameter of a note to be changed, and a JSON body containing the updated record data.

| Parameter | Description |
| --- | --- |
| title | (string) The title of the note |
| content | (string) The content in markdown format |
| notebook | (string) The notebook/category where the note should be categorized |
| tags | (string) A string, containing keywords, delimited by `/`, for the note to be searched for |
| public | (boolean) A true/false marker for marking the public/shareable permission of the note |

Specific responses:

| Status | Response |
|---|---|
| 202 | `message: accepted` |
| 404 | `message: not found` |
| 400 | JSON formatted array, containing all the input validation errors |


#### Delete a specific note: 

`DELETE /notes/<id>` with the required `id` parameter of a note to be deleted.

Specific responses:

| Status | Response |
|---|---|
| 202 | `message: deleted` |
| 404 | `message: not found` |

### `Groups`

| Request |
| --- |
| `GET /groups` |
| `GET /groups/<id>` |
| `POST /groups` |
| `PUT /groups/<id>` |
| `DELETE /groups/<id>` |

#### Get the full list of groups:

`GET /groups`

Specific responses:

| Status | Response |
|---|---|
| 200 | JSON formatted array, containing all the groups |

#### Get a specific group:

`GET /groups/<id>` with the required `id` parameter of the requested group.

Specific responses:

| Status | Response |
|---|---|
| 200 | JSON formatted object, containing the group with the parameter `id` |
| 404 | `message: not found` |

#### Add a group: 

`POST /groups` with a JSON body containing the record data.

| Parameter | Description |
| --- | --- |
| users | (string - required) A string, containing the users IDs of the users that are group members, delimited by `/` |
| notes | (string - optional) A string, containing the notes IDs of the notes that can be accessed by the users of the group, delimited by `/` |

Specific responses:

| Status | Response |
|---|---|
| 201 | `message: created` |
| 500 | `message: Group creation has failed (Server error)` |
| 400 | JSON formatted array, containing all the input validation errors |

#### Update a specific group: 

`PUT /groups/<id>` with the required `id` parameter of a group to be changed, and a JSON body containing the updated record data.

| Parameter | Description |
| --- | --- |
| users | (string) A string, containing the users IDs of the users that are group members, delimited by `/` |
| notes | (string) A string, containing the notes IDs of the notes that can be accessed by the users of the group, delimited by `/` |

Specific responses:

| Status | Response |
|---|---|
| 202 | `message: accepted` |
| 404 | `message: not found` |
| 400 | JSON formatted array, containing all the input validation errors |


#### Delete a specific group: 

`DELETE /groups/<id>` with the required `id` parameter of a group to be deleted.

Specific responses:

| Status | Response |
|---|---|
| 202 | `message: deleted` |
| 404 | `message: not found` |

*For all endpoints: Besides the specific responses, all conventional errors and all conventional status codes are used, to represent unhandled errors, and to be used for debugging purposes.



## React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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
