"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });

      User.hasMany(models.UserSession, {
        foreignKey: "userId",
        as: "sessions",
      });
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value) {
          if (value) {
            this.setDataValue(
              "firstName",
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            );
          }
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value) {
          if (value) {
            this.setDataValue(
              "lastName",
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            );
          }
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      roleId: {
        type: DataTypes.UUID,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};
