import CategoryJob from "../models/CategoryJob.js"
import toSlug from '../utils/slug.js'

const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryJob.findAll();

        return res.status(200).json({ categories })
    } catch (error) {
        console.error('Lỗi khi gọi hàm getAllCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'})
    } 
}

const createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({messsage: 'Tiêu đề không được bỏ trống'})  
        }

        if(!req.file) {
            return res.status(400).json({ message: 'Không thấy file'})
        }

        const category = await CategoryJob.create({ 
            title,
            iconUrl: req.file.path,
            slug: toSlug(title)
        })

        return res.status(201).json({ category })
    } catch (error) {
        console.error('Lỗi khi gọi hàm createCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'})
    }
}

const updateCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const { categoryId } = req.params;

        const category = await CategoryJob.findByPk(categoryId)
        if (!category) {
            return res.status(404).json({messsage: 'Không tìm thấy danh mục'})
        }

        category.title = title;
        category.iconUrl = req.file.path;
        category.slug = toSlug(title)
        await category.save()

        return res.status(200).json({message: 'Cập nhật thành công', category})
    } catch (error) {
        console.error('Lỗi khi gọi hàm updateCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'})
    }
}
const deleteCategory = async (req, res) => {
    try {
         const { categoryId } = req.params;

        const category = await CategoryJob.findByPk(categoryId)
        if (!category) {
            return res.status(404).json({messsage: 'Không tìm thấy danh mục'})
        }

        await category.destroy({ where:{id: categoryId }})
        return res.status(200).json({message: 'Xóa thành công', category})
    } catch (error) {
       console.error('Lỗi khi gọi hàm deleteCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'}) 
    }

}


export {
    getAllCategory, 
    createCategory,
    updateCategory,
    deleteCategory
}