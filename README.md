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
-  [nodemon](https://github.com/remy/nodemon)
-  [Multer](https://github.com/expressjs/multer)
-  [ReactJS](https://reactjs.org/)
-  [Redux](https://redux.js.org/)
-  [Redux-Saga](https://redux-saga.js.org/)
-  [styled-components](https://www.styled-components.com/)
-  [React Router](https://github.com/ReactTraining/react-router)
-  [Axios](https://github.com/axios/axios)
-  [History](https://www.npmjs.com/package/history)
-  [Immer](https://github.com/immerjs/immer)
-  [Polished](https://polished.js.org/)
-  [React-Toastify](https://fkhadra.github.io/react-toastify/)
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

# Install dependencies
$ yarn

# Execute migrations
$ yarn sequelize db:migrate

# And execute seeds
$ yarn sequelize db:seed:all

# Run the backend
$ yarn dev
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

## :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/riquetinem/FastFeet/blob/master/LICENSE) for more information.

---

Made with ♥ by Henrique Tinem :wave: [Get in touch!](https://www.linkedin.com/in/henrique-tinem/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
