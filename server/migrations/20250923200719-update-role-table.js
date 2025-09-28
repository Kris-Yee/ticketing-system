'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove foreign key constraint from Users table
    await queryInterface.removeConstraint('Users', 'Users_role_fkey');
    
    // Drop the existing table
    await queryInterface.dropTable('Roles');
    await queryInterface.createTable('tb_roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      roleName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
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
    
    // Add foreign key constraint back to Users table
    await queryInterface.addConstraint('Users', {
      fields: ['role'],
      type: 'foreign key',
      name: 'Users_role_fkey',
      references: {
        table: 'tb_roles',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
