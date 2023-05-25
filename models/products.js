"use strict";
const { Model } = require("sequelize");
// const categories = require("./categories");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, {
        foreignKey: "id",
        target_key: "categories_id",
      });
    }
  }
  products.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
