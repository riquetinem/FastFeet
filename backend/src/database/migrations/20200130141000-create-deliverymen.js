module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliverymen', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      avatar_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'files', key: 'id' },
        onUpdate: 'CASCDE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliverymen');
  },
};
