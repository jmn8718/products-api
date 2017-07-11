'use strict';
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ean: {
      allowNull: false,
      type: Sequelize.STRING
    },
    model: {
      allowNull: false,
      type: Sequelize.STRING
    },
  });

  Product.associate = (models) => {

  }

  return Product;
};
