const product = require('../models/product');
exports.createproduct = async (req, res) => {
  try {
    const { id , name , price , description , quantity , marque} = req.body;
    const produit = await product.create({ id , name , price , description , quantity , marque});
    res.status(201).json(produit);
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

      const products = await Product.findAll({ where });
      res.status(200).json(products);
  }catch (error) {
      res.status(400).json({ error: error.message });
  }
};
exports.getproductById = async (req, res) => {
  try {
    const produit = await product.findByPk(req.params.id);
    if (!produit) {
      res.status(404).json({ message: "product Not Found" });
    } else {
      res.json(produit);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateproduct = async (req, res) => {
  try {
    const { id , name , price , description , quantity , marque} = req.body;
    const produit = await product.findByPk(req.params.id);
    if (!produit) {
      res.status(404).json({ message: "product Not Found" });
    } else {
      await produit.update({ id , name , price , description , quantity , marque});
      res.json(produit);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteproduct = async (req, res) => {
  try {
    const produit = await product.findByPk(req.params.id);
    if (!produit) {
      res.status(404).json({ message: "product Not Found" });
    } else {
      await produit.destroy();
      res.json({ message: "product remove" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
