import Sequelize from 'sequelize';

// importacao das models
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';

import databaseConfig from '../config/database';

// array com todos os models
const models = [User, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // para conectar a model (schema) no banco de dados
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
