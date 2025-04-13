const Product = require('../models/product');
exports.createproduct = async (req, res) => {
  try {
    const { id , name , price , description , quantity , marque , statut , categoryId} = req.body;
    const product = await Product.create({ id , name , price , description , quantity , marque , statut , categoryId});
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getallproduct = async (req, res) => {
  try {
      const { priceMin, priceMax, marque, statut, search } = req.query;

      
      const where = {};
      if (priceMin || priceMax) {
          where.price = {};
          if (priceMin) where.price[Op.gte] = parseFloat(priceMin);
          if (priceMax) where.price[Op.lte] = parseFloat(priceMax);
      }
      
      if (marque) where.marque = { [Op.like]: `%${marque}%` }; 
      if (statut) where.statut = statut;
      if (search) {
          where[Op.or] = [
              { description: { [Op.like]: `%${search}%` } },
              { marque: { [Op.like]: `%${search}%` } }, 
          ];
      }

      const Products = await Product.findAll({ where });
      res.status(200).json(Products);
  }catch (error) {
      res.status(400).json({ error: error.message });
  }
};
exports.getproductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateproduct = async (req, res) => {
  try {
    const { id , name , price , description , quantity , marque} = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    } else {
      await product.update({ id , name , price , description , quantity , marque});
      res.json(product);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteproduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    } else {
      await product.destroy();
      res.json({ message: "Product remove" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
