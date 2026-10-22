const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy một sản phẩm theo pid
router.get('/:pid', async(req, res) => {
    try {
        const pid = Number(req.params.pid);

        if (Number.isNaN(pid)) {
            return res.status(400).json({ message: 'pid phải là số' });
        }

        const product = await Product.findOne({ pid });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm sản phẩm
router.post('/', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        const status = error.code === 11000 ? 409 : 400;
        res.status(status).json({ message: error.message });
    }
});

// Cập nhật sản phẩm theo pid
router.put('/:pid', async(req, res) => {
    try {
        const pid = Number(req.params.pid);

        if (Number.isNaN(pid)) {
            return res.status(400).json({ message: 'pid phải là số' });
        }

        const product = await Product.findOneAndUpdate({ pid },
            req.body, { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Xóa sản phẩm theo pid
router.delete('/:pid', async(req, res) => {
    try {
        const pid = Number(req.params.pid);

        if (Number.isNaN(pid)) {
            return res.status(400).json({ message: 'pid phải là số' });
        }

        const product = await Product.findOneAndDelete({ pid });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.json({ message: 'Đã xóa sản phẩm', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;