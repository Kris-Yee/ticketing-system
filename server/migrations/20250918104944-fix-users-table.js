"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      //To get current table structure, since i want to add new column and delete sonme old columns
      const tableDescription = await queryInterface.describeTable("Users");

      //i want to remove unwanted columns before adding new one
      if (tableDescription.name) {
        await queryInterface.removeColumn("Users", "name", { transaction });
        console.log("Removed: name column");
      }

      if (tableDescription.status) {
        await queryInterface.removeColumn("Users", "status", { transaction });
        console.log("Removed: status column");
      }

      if (tableDescription.createdAt) {
        await queryInterface.removeColumn("Users", "createdAt", {
          transaction,
        });
        console.log("Removed: createdAt column");
      }

      if (tableDescription.updatedAt) {
        await queryInterface.removeColumn("Users", "updatedAt", {
          transaction,
        });
        console.log("Removed: updatedAt column");
      }

      if (tableDescription.deletedAt) {
        await queryInterface.removeColumn("Users", "deletedAt", {
          transaction,
        });
        console.log("Removed: deletedAt column");
      }

      if (!tableDescription.firstName) {
        await queryInterface.addColumn(
          "Users",
          "firstName",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: firstName column");
      }

      if (!tableDescription.lastName) {
        await queryInterface.addColumn(
          "Users",
          "lastName",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: lastName column");
      }

      if (!tableDescription.isEmailVerified) {
        await queryInterface.addColumn(
          "Users",
          "isEmailVerified",
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction }
        );
        console.log("Added: isEmailVerified column");
      }

      if (!tableDescription.profileImage) {
        await queryInterface.addColumn(
          "Users",
          "profileImage",
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction }
        );
        console.log("Added: profileImage column");
      }

      if (!tableDescription.isActive) {
        await queryInterface.addColumn(
          "Users",
          "isActive",
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction }
        );
        console.log("Added: isActive column");
      }

      if (!tableDescription.createdOn) {
        await queryInterface.addColumn(
          "Users",
          "createdOn",
          {
            type: Sequelize.DATE,
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: createdOn column");
      }

      if (!tableDescription.createdBy) {
        await queryInterface.addColumn(
          "Users",
          "createdBy",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: createdBy column");
      }

      if (!tableDescription.updatedOn) {
        await queryInterface.addColumn(
          "Users",
          "updatedOn",
          {
            type: Sequelize.DATE,
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: updatedOn column");
      }

      if (!tableDescription.updatedBy) {
        await queryInterface.addColumn(
          "Users",
          "updatedBy",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: updatedBy column");
      }

      if (!tableDescription.roleId) {
        await queryInterface.addColumn(
          "Users",
          "roleId",
          {
            type: Sequelize.UUID,
            references: {
              model: "Roles",
              key: "id",
            },
            allowNull: false,
          },
          { transaction }
        );
        console.log("Added: roleId column");
      }

      await transaction.commit();
      console.log("User table migration completed");
    } catch (error) {
      await transaction.rollback();
      console.log("User table migration failed");
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // to undo the changes made in the up method
      await queryInterface.removeColumn("Users", "firstName", { transaction });
      console.log("Removed: firstName column");
      await queryInterface.removeColumn("Users", "lastName", { transaction });
      console.log("Removed: lastName column");
      await queryInterface.removeColumn("Users", "isEmailVerified", {
        transaction,
      });
      console.log("Removed: isEmailVerified column");
      await queryInterface.removeColumn("Users", "profileImage", {
        transaction,
      });
      console.log("Removed: profileImage column");
      await queryInterface.removeColumn("Users", "isActive", { transaction });
      console.log("Removed: isActive column");
      await queryInterface.removeColumn("Users", "createdOn", { transaction });
      console.log("Removed: createdOn column");
      await queryInterface.removeColumn("Users", "createdBy", { transaction });
      console.log("Removed: createdBy column");
      await queryInterface.removeColumn("Users", "updatedOn", { transaction });
      console.log("Removed: updatedOn column");
      await queryInterface.removeColumn("Users", "updatedBy", { transaction });
      console.log("Removed: updatedBy column");
      await queryInterface.removeColumn("Users", "roleId", { transaction });
      console.log("Removed: roleId column");

      // to add back the columns ive removed
      await queryInterface.addColumn(
        "Users",
        "name",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      console.log("Added: name column");
      await queryInterface.addColumn(
        "Users",
        "createdAt",
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
        { transaction }
      );
      console.log("Added: createdAt column");
      await queryInterface.addColumn(
        "Users",
        "updatedAt",
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
        { transaction }
      );
      console.log("Added: updatedAt column");
      await queryInterface.addColumn(
        "Users",
        "deletedAt",
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction }
      );
      console.log("Added: deletedAt column");

      await transaction.commit();
      console.log("User table migration completed");
    } catch (error) {
      await transaction.rollback();
      console.log("User table migration failed");
      throw error;
    }
  },
};
