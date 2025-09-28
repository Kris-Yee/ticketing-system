'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_role.init({
    roleName: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tb_role',
    paranoid: true,
  });
  return tb_role;
};