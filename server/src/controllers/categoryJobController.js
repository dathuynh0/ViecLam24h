import { Op } from "sequelize";
import CategoryJob from "../models/CategoryJob.js"
import Company from "../models/Company.js";
import Job from '../models/Job.js'
import toSlug from '../utils/slug.js'
import sequelize from "../config/db.js";

const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryJob.findAll({
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "Jobs" AS job
                        WHERE job."categoryId" = "CategoryJob"."id"
                    )`),
                    'jobCount'
                ]
                ]
            },
            order: [[sequelize.literal('"jobCount"'), 'DESC']]
        });

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

        const exitingCategory = await CategoryJob.findOne({ where: { title } });
        if(exitingCategory) {
            return res.status(400).json({ message: 'Tiêu đề danh mục đã tồn tại'});
        }

        const category = await CategoryJob.create({ 
            title,
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
            return res.status(404).json({ messsage: 'Không tìm thấy danh mục' })
        }

        category.title = title;
        category.slug = toSlug(title)
        await category.save()

        return res.status(200).json({ message: 'Cập nhật thành công', category })
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
            return res.status(404).json({ messsage: 'Không tìm thấy danh mục'})
        }

        await category.destroy();
        return res.status(200).json({ message: 'Xóa thành công', category })
    } catch (error) {
        console.error('Lỗi khi gọi hàm deleteCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'}) 
    }

}


const getCategoryBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;

        const category = await CategoryJob.findOne({ where: { slug }, attributes: ['title', 'slug'] })
        if(!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục'})
        }

        return res.status(200).json({ category });
    } catch (error) {
        console.error('Lỗi khi gọi hàm getCategoryBySlug ', error)
        return res.status(500).json({ message: 'Lỗi sever'}) 
    }
}


const getAllCategoryAdmin = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 8;
        const offset = (page - 1) * limit;

        const { count, rows: categories} = await CategoryJob.findAndCountAll({
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "Jobs" AS job
                        WHERE job."categoryId" = "CategoryJob"."id"
                    )`),
                    'jobCount'
                ]
                ]
            },
            limit,
            offset,
            order: [[sequelize.literal('"jobCount"'), 'DESC']]
        });

        const totalPage = Math.ceil(count / limit);

        return res.status(200).json({ categories, page, totalPage })
    } catch (error) {
        console.error('Lỗi khi gọi hàm getAllCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'})
    } 
}


export {
    getAllCategory, 
    getAllCategoryAdmin,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryBySlug
}