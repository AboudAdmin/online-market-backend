const category = require("../models/category");

const getAllcategory = async(req, res) =>{
    try{
        const categoryList = await category.findAll();
        res.json(categoryList)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
}
const getcategoryById = async(req, res) =>{
    const categoryID = req.params.categoryID;
    try{
        const Category = await category.findByPk(categoryID);
        if(Category){
            res.json(Category)
        }
        else{
            res.status(404).json({message:"category not found"})
        }
    } catch(error){
        res.status(500).json({ error: error.message})
    }
}
const createcategory = async(req, res) =>{
    const {name , description} = req.body;
    try{
        const newcategory = await category.create({name , description});
        res.status(201).json(newcategory)
    }catch(error){
        res.status(500).json({ error: error.message})
    }
}
const updatecategory = async(req, res) =>{
    const categoryID = req.params.categoryID;
    const {name , description} = req.body;
    try{
        const Category = await category.findByPk(categoryID);
        if(Category){
            await Category.update({name , description});
            res.json(Category)
        }else{
            res.status(404).json({message: "category not found"})
        }
    }catch(error){
        res.status(500).json({ error: error.message})
    }
}
const deletecategory = async(req, res) =>{
    const CategoryID = req.params.categoryID;
    try{
        const Category = await category.findByPk(CategoryID);
        if(Category){
            await Category.destroy();
            res.json({message:"category deleted"})
        }else{
            res.status(404).json({message: "category not found"})
        }
    }catch(error){
        res.status(500).json({ error: error.message})
    }
};
module.exports = {getAllcategory,getcategoryById,createcategory,updatecategory,deletecategory}