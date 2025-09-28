'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSession.belongsTo(models.User, {
        foreignKey: "userId",
        as: 'user'
      });
    }

    // Instance method for session management
    isExpired() {
      return new Date() >= this.expiresAt
    }

    async logout() {
      this.logoutAt = new Date();
      this.isActive = false;
      await this.save();
    }

    // To check if the session valid
    isValid() {
      return this.isActive && !this.isExpired() && !this.logoutAt;
    }
  }
  
  UserSession.init({
    sessionId: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: { 
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    sessionToken: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    logoutAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'UserSession',
    timestamps: true,
    paranoid: true
  });
  
  return UserSession;
};