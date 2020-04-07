<h1 align="center">
    <img alt="FastFeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" />
    <br>
    FastFeet
</h1>

<h4 align="center">
  Delivery App with Node.js, React + Redux and React Native.
</h4>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :rocket: Technologies

This project was developed at the [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp) with the following technologies:

-  [Node.js][nodejs]
-  [Express](https://expressjs.com/)
-  [Nodemon](https://github.com/remy/nodemon)
-  [JWT](https://jwt.io/)
-  [Multer](https://github.com/expressjs/multer)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)
-  [Sequelize](http://docs.sequelizejs.com/)
-  [PostgreSQL](https://www.postgresql.org/)
-  [Youch](https://www.npmjs.com/package/youch)
-  [Sentry](https://sentry.io/)
-  [Bee Queue](https://www.npmjs.com/package/bcrypt)
-  [Docker](https://www.docker.com/docker-community)
-  [DotEnv](https://www.npmjs.com/package/dotenv)
-  [ReactJS](https://reactjs.org/)
-  [Redux](https://redux.js.org/)
-  [Redux-Saga](https://redux-saga.js.org/)
-  [styled-components](https://www.styled-components.com/)
-  [React Router](https://github.com/ReactTraining/react-router)
-  [Axios](https://github.com/axios/axios)
-  [History](https://www.npmjs.com/package/history)
-  [Immer](https://github.com/immerjs/immer)
-  [Polished](https://polished.js.org/)
-  [React Navigation](https://reactnavigation.org/)
-  [Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker)
-  [Date-fns](https://date-fns.org/)
-  [Prop-Types](https://github.com/facebook/prop-types)
-  [Yup](https://github.com/jquense/yup)
-  [React Toastify](https://github.com/fkhadra/react-toastify)
-  [React Navigation](https://reactnavigation.org/)
-  [Reactjs Popup](https://github.com/yjose/reactjs-popup)
-  [React-Icons](https://react-icons.netlify.com/)
-  [Reactotron](https://infinite.red/reactotron)
-  [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/riquetinem/fastfeet.git

# Go into the repository
$ cd fastfeet
```
You need create a database PostgreSQL and Redis to run backend

```bash
# Go into backend
$ cd backend

# If you are using the docker, you can use the following commands
# POSTGRES
$ sudo docker run --name databasename -e POSTGRES_PASSWORD=passwordhere -p 5432:5432 -d postgres
# REDIS
$ sudo docker run --name databasename -p 6379:6379 -d -t redis:alpine

# Clone .env.example to .env and complete with your information
$ cp .env.example .env

# Install dependencies
$ yarn

# Execute migrations
$ yarn sequelize db:migrate

# And execute seeds
$ yarn sequelize db:seed:all

# Run the backend
$ yarn dev

# If you want to use email sending, in another terminal run
$ yarn queue
```

Now in the frontend:
```bash
# On another terminal, go to the frontend folder
$ cd ../frontend

# Install dependencies
$ yarn

# Run the frontend
$ yarn start
```

Now in the mobile (tests performed only on Android)
```bash
# On another terminal, go to the mobile folder
$ cd ../mobile

# Install dependencies
$ yarn 

# To start the mobile application you need the "react native" installed globally
$ yarn global add react-native-cli

# Start emulator android
$ emulator -avd AVD-NAME

# Run the app (Android)
$ react-native run-android

# If you are using linux, run
$ react-native start
```

## :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/riquetinem/FastFeet/blob/master/LICENSE) for more information.

---

Made with ♥ by Henrique Tinem :wave: [Get in touch!](https://www.linkedin.com/in/henrique-tinem/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
