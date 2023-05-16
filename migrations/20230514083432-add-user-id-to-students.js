'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('class', 'category', {
      type: Sequelize.ENUM('sciences', 'art', 'commercial', 'technology'),
      allowNull: false,
      references: {
        model: 'class',
        key: 'category'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('class', 'category');
  }
};

