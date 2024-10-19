    const Category = require('../model/categoryModel');
    module.exports.addCategory = async (req, res, next) => {
        try {
            const { categoryName } = req.body; 
            
            const existingCategory = await Category.findOne();
    
            if (!existingCategory || existingCategory.CategoryArray.length === 0) {
                const newCategory = new Category({
                    CategoryArray: [categoryName]
                });
                await newCategory.save();
                return res.status(201).json({ message: 'Category added successfully', category: categoryName });
            } else {
                existingCategory.CategoryArray.push(categoryName);
                await existingCategory.save();
                return res.status(201).json({ message: 'Category added successfully', category: categoryName });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to add category' });
        }
    };
    
    module.exports.getCategory = async (req, res, next) => {
        try {
        const categories = await Category.find();
        console.log(categories[0].CategoryArray)
        res.status(200).json(categories)
        } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get categories' });
        }
    };

    module.exports.deleteCategory = async (req, res, next) => {
        try {
            const categoryName = req.params.categoryName;
            const category = await Category.findOne();

            console.log('category->',category)
            
            if (!category || category.CategoryArray.length === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }
    
            const index = category.CategoryArray.indexOf(categoryName);
            console.log("index",index)
            if (index === -1) {
                return res.status(404).json({ error: 'Category not found' });
            }
    
            category.CategoryArray.splice(index, 1);
            await category.save();
    
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to delete category' });
        }
    };
