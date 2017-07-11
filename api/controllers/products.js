'use strict';

const data = [
  { id: 1, name: 'Samsung', ean: '998485456454' },
  { id: 2, name: 'Samsung', ean: '345356475857' },
  { id: 3, name: 'LG', ean: '345345343534' },
  { id: 4, name: 'Sony', ean: '867874645' },
  { id: 5, name: 'Apple', ean: '32445564' },
  { id: 6, name: 'LG', ean: 'dasdasd4324' },
];

let id = data.length;

const extractData = (search = '', limit = 0, skip = 0) => {
  const filteredData = !search ? data : data.filter((product) => product.name.indexOf(search) > -1 || product.ean.indexOf(search) > -1);
  return filteredData.slice(skip, limit > 0 ? limit : filteredData.length);
}

const getProducts = (req, res) => {
  const { search, limit, skip } = req.swagger.params;
  const products = extractData(search.value, limit.value, skip.value);
  res.json({
    count: products.length,
    data: products,
  });
}

const createProduct = (req, res) => {
  const value = req.swagger.params.data.value;
  const newProduct = {
    id: ++id,
    name: value.name,
    ean: value.ean,
  };

  data.push(newProduct);
  res.status(201).json(newProduct);
}

const updateProduct = (req, res) => {
  const id = req.swagger.params.productId.value;
  const value = req.swagger.params.data.value;

  const index = data.findIndex((product) => product.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  data[index].name = value.name;
  data[index].ean = value.ean;

  res.json(data[index]);
}

const deleteProduct = (req, res) => {
  const id = req.swagger.params.productId.value;
  const index = data.findIndex((product) => product.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  const productsDeleted = data.splice(index, 1);
  res.json(productsDeleted[0]);
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
