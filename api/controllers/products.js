'use strict';

const Product = require('../../db/models').Product;

const getProducts = (req, res) => {
  const { search, limit, skip } = req.swagger.params;
  const query = {};
  if (limit.value) {
    query.limit = args.limit.value;
  }
  if (skip.value) {
    query.offset = args.skip.value;
  }
  if (search.value) {
    query.where = {
      $or: [
        { name: { $like: `%${search.value}%` }},
        { ean: { $like: `%${search.value}%` }},
        { model: { $like: `%${search.value}%` }},
        { brand: { $like: `%${search.value}%` }},
      ],
    };
  }

  Product.findAndCountAll(query)
    .then((result) => res.json({
      count: result.count,
      data: result.rows,
    }))
    .catch((err) => {
      console.log(err)
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    });
}

const getProduct = (req, res) => {
  const id = req.swagger.params.productId.value;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }
      return product;
    })
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err)
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    });
}

const createProduct = (req, res) => {
  const data = req.swagger.params.data.value;

  Product.create(data)
    .then((product) => res.status(201).json(product))
    .catch((err) => {
      console.log(err)
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    });
}

const updateProduct = (req, res) => {
  const id = req.swagger.params.productId.value;
  const data = req.swagger.params.data.value;
  let productToUpdate;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }
      return product.update(data , {
        fields: [
          'name',
          'model',
          'description',
          'brand',
          'ean',
          'image',
        ],
      });
    })
    .then(() => Product.findById(id))
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err)
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    });
}

const deleteProduct = (req, res) => {
  const id = req.swagger.params.productId.value;
  let productToDelete;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }
      productToDelete = product;
      return product.destroy();
    })
    .then(() => res.json(productToDelete))
    .catch((err) => {
      console.log(err)
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
