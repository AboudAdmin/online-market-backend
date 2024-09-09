const Photo = require('../models/photos'); 
exports.createPhoto = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const photo = new Photo({ title, url, description });
    await photo.save();
    res.status(201).send(photo);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllPhotosByProductId = async (req, res) => {
  try {
    const productid = req.params.productid;
    const photos = await Photo.findAll({
      where:{productId:productid}
    });
    res.status(200).send(photos);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send({ message: 'Photo not found' });
    }
    res.status(200).send(photo);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).send({ message: 'Photo not found' });
    }
    res.status(200).send(photo);
  } catch (error) {
    res.status(500).send(error);
  }
};
