'use strict';
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ean: {
      allowNull: false,
      type: DataTypes.STRING
    },
    model: {
      allowNull: false,
      type: DataTypes.STRING
    },
    brand: {
      allowNull: false,
      type: DataTypes.STRING
    },
  });

  Product.associate = (models) => {

  }

  return Product;
};
