import Sequelize from 'sequelize';

// importacao das models
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import DeliveryMan from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';

import databaseConfig from '../config/database';

// array com todos os models
const models = [User, Recipient, File, DeliveryMan, Delivery];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // para conectar a model (schema) no banco de dados
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
