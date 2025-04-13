const product = require('../models/product');
const category = require('../models/category');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

 exports.upload = multer({ storage });

exports.createproduct = async (req, res) => {
  try {
    // Parse the form data
    const { name, price, description, quantity, marque, statut, categoryId } = req.body;

    // Handle the uploaded image
    const img = req.file ? req.file.filename : null;

    // Log the received data for debugging
    console.log('Received Data:', {
      name,
      price,
      description,
      quantity,
      marque,
      statut,
      categoryId,
      img,
    });

    // Save the product to the database
    const produit = await product.create({
      name,
      price,
      description,
      quantity,
      marque,
      statut,
      categoryId, 
      image:img,
    });

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
              { name: { [Op.like]: `%${search}%` } }, 
          ];
      }

      // const products = await product.findAll({ where });
      const products = await product.findAll({
        where,
        include: [
          {
            model: category,
            as: 'category', // Ensure this matches the association alias
            attributes: ['name'], // Only include the category name
          },
        ],
      });
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
exports.getproductsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryid;
    const products = await product.findAll({
      where: { categoryId },
      include: [
        {
          model: category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}