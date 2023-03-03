# react-demo-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Before you're able to work in this project, please make sure that you've at least installed node v16 and npm v8.
After that you can install the dependencies for this project by running the following command in the root of this project:

```shell
npm install
```

### ESLint and Prettier

This project is working with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
To make your editor work with these tools, please check [here](https://prettier.io/docs/en/editors.html) to make sure
Prettier formats your files after every save. For ESLint, check
[here](https://eslint.org/docs/latest/use/integrations#editors) for more info about configuring your editor

#### Webstorm

For Webstorm, the Prettier configuration should look like the following:

![webstorm-prettier-config.png](documentation/images/webstorm-prettier-config.png)

And the ESLint configuration should like the following:

![webstorm-eslint-config.png](documentation/images/webstorm-eslint-config.png)

#### Visual Studio Code

For VSC a list with recommended extensions is provided with this project, so please make sure to install those.
The project also contains workspace settings so that those extensions will run on every save to fix formatting and linting
errors, should the pop-up.

### Environment variables

A couple of environment variables need to be set before you are able to run the application. These need to be set in a
`.env.local` file in the root of the project. Please, create this file and add the following contents:

```
# This makes sure that upon running the `start` script, your browser won't open automatically
BROWSER=none

# This will make sure the development application will run on port 4200
PORT=4200

# Forces the build to target resources at the root of the application, for GitHub Pages this could be changed to a different
# value to make sure your application can find its resources
PUBLIC_URL=/

# Outputs the result of the `build` script to the target folder determined below
BUILD_PATH=dist/react-demo-app
```

For more information about these environment variables, please refer to the
[advanced configuration](https://create-react-app.dev/docs/advanced-configuration/) section.

## Available Scripts

In the project directory, you can run the following scripts:

| Script                 | Description                                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run start`        | Runs the app in the development mode. Open http://localhost:4200/ to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.                                                                                                                                                                |
| `npm run test`         | Launches the test runner in the interactive watch mode. See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.                                                                                                                                                                                     |
| `npm run build`        | Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information. |
| `npm run preview`      | Runs the build script and serves the build files, using Servor to preview the production build locally.                                                                                                                                                                                                                                                   |
| `npm run lint`         | Checks the source files against the linting rules.                                                                                                                                                                                                                                                                                                        |
| `npm run format:check` | Checks the source files against the linting & prettier rules.                                                                                                                                                                                                                                                                                             |
| `npm run format:write` | Checks the source files against the linting & prettier rules, and fixes any errors that pop-up.                                                                                                                                                                                                                                                           |

## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).
To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved [here](https://create-react-app.dev/docs/code-splitting/).
