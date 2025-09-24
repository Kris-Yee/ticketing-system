'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_role_actions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: 'tb_roles',
          key: 'id'
        },

      },
      actionId: {
        type: Sequelize.UUID,
        references: {
          model: 'tb_actions',
          key: 'id'
        },
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'system'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'system'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_role_actions');
  }
};